const fs = require('fs');
const path = require('path');

/**
 * Robust YAML and frontmatter parser for IP3 build system.
 * Zero external dependencies.
 */
function parseYaml(yamlString) {
    yamlString = yamlString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = yamlString.split('\n');

    function parseValue(val) {
        if (val === undefined || val === null) return '';
        val = val.trim();
        if (val === '') return '';
        if (val === 'true') return true;
        if (val === 'false') return false;
        if (val === 'null' || val === '~') return null;
        if (val === '[]') return [];
        if (val === '{}') return {};

        // Quoted string
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            const quote = val[0];
            let inner = val.slice(1, -1);
            if (quote === '"') {
                inner = inner.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
            } else {
                inner = inner.replace(/\\'/g, "'");
            }
            return inner;
        }

        // Number (integer or float, not starting with 0 unless 0 itself)
        if (/^-?\d+(\.\d+)?$/.test(val)) {
            // Keep strings like "01" as string if leading zero with multiple digits
            if (/^0\d+/.test(val)) return val;
            return Number(val);
        }

        return val;
    }

    function parseBlock(startLine, baseIndent) {
        let isArray = null;
        const resultObj = {};
        const resultArr = [];
        let i = startLine;

        while (i < lines.length) {
            const rawLine = lines[i];
            const trimmed = rawLine.trim();

            // Skip empty lines and comment lines
            if (!trimmed || trimmed.startsWith('#')) {
                i++;
                continue;
            }

            // Calculate indentation
            const indentMatch = rawLine.match(/^(\s*)/);
            const indent = indentMatch ? indentMatch[1].length : 0;

            if (indent < baseIndent) {
                // Out of current block scope
                break;
            }

            // Check if line is a list item: - value or - key: value
            const listMatch = rawLine.slice(baseIndent).match(/^-\s*(.*)$/);
            if (listMatch) {
                if (isArray === null) isArray = true;
                const rest = listMatch[1].trim();

                // Check if this list item starts an inline object or a scalar or a nested block
                const inlineKv = rest.match(/^([A-Za-z0-9_@-]+):\s*(.*)$/);
                if (inlineKv) {
                    // Object inside array:
                    // e.g. - title: "..."
                    //        url: "..."
                    const itemObj = {};
                    const key = inlineKv[1];
                    const valStr = inlineKv[2].trim();
                    const itemBaseIndent = indent + rawLine.slice(indent).indexOf('-') + 2;

                    if (valStr === '' || valStr === '|' || valStr === '>') {
                        const [nestedVal, nextIdx] = parseBlock(i + 1, itemBaseIndent);
                        itemObj[key] = nestedVal;
                        i = nextIdx;
                    } else {
                        itemObj[key] = parseValue(valStr);
                        i++;
                    }

                    // Continue reading siblings of this item object
                    while (i < lines.length) {
                        const nextRaw = lines[i];
                        const nextTrimmed = nextRaw.trim();
                        if (!nextTrimmed || nextTrimmed.startsWith('#')) {
                            i++;
                            continue;
                        }
                        const nextIndent = nextRaw.match(/^(\s*)/)[1].length;
                        if (nextIndent < itemBaseIndent) break;
                        if (nextRaw.slice(itemBaseIndent).trim().startsWith('-')) break;

                        const nextKv = nextRaw.slice(itemBaseIndent).match(/^([A-Za-z0-9_@-]+):\s*(.*)$/);
                        if (nextKv) {
                            const nKey = nextKv[1];
                            const nValStr = nextKv[2].trim();
                            if (nValStr === '' || nValStr === '|' || nValStr === '>') {
                                const [nestedVal, nextIdx] = parseBlock(i + 1, itemBaseIndent + 2);
                                itemObj[nKey] = nestedVal;
                                i = nextIdx;
                            } else {
                                itemObj[nKey] = parseValue(nValStr);
                                i++;
                            }
                        } else {
                            i++;
                        }
                    }

                    resultArr.push(itemObj);
                    continue;
                } else if (rest === '' || rest === '|' || rest === '>') {
                    // Nested block inside list item
                    const [nestedVal, nextIdx] = parseBlock(i + 1, indent + 2);
                    resultArr.push(nestedVal);
                    i = nextIdx;
                    continue;
                } else {
                    resultArr.push(parseValue(rest));
                    i++;
                    continue;
                }
            }

            // Key-value pair
            const kvMatch = rawLine.slice(baseIndent).match(/^([A-Za-z0-9_@-]+):\s*(.*)$/);
            if (kvMatch) {
                if (isArray === null) isArray = false;
                const key = kvMatch[1];
                let valStr = kvMatch[2].trim();

                // Multiline text indicator: | or >
                if (valStr === '|' || valStr === '|-') {
                    let blockLines = [];
                    i++;
                    const blockIndent = baseIndent + 2;
                    while (i < lines.length) {
                        const bRaw = lines[i];
                        const bIndent = bRaw.match(/^(\s*)/)[1].length;
                        if (bRaw.trim() && bIndent < blockIndent) break;
                        blockLines.push(bRaw.slice(blockIndent));
                        i++;
                    }
                    resultObj[key] = blockLines.join('\n').trim();
                    continue;
                }

                if (valStr === '' || valStr.startsWith('#')) {
                    // Next lines contain nested object or array
                    const [nestedVal, nextIdx] = parseBlock(i + 1, indent + 2);
                    resultObj[key] = nestedVal;
                    i = nextIdx;
                    continue;
                }

                // Scalar value or folded continuation
                let val = parseValue(valStr);
                i++;

                // If next line is indented more and neither a new key nor list item, it's folded multiline string
                while (i < lines.length) {
                    const nextRaw = lines[i];
                    const nextTrim = nextRaw.trim();
                    if (!nextTrim || nextTrim.startsWith('#')) {
                        i++;
                        continue;
                    }
                    const nextIndent = nextRaw.match(/^(\s*)/)[1].length;
                    if (nextIndent <= indent) break;
                    if (nextRaw.slice(indent + 1).match(/^([A-Za-z0-9_@-]+):\s*/) || nextRaw.slice(indent + 1).trim().startsWith('-')) {
                        break;
                    }
                    if (typeof val === 'string') {
                        val += ' ' + nextTrim;
                    }
                    i++;
                }

                resultObj[key] = val;
                continue;
            }

            i++;
        }

        return [isArray ? resultArr : resultObj, i];
    }

    const [parsed] = parseBlock(0, 0);
    return parsed || {};
}

function parseMarkdown(content) {
    content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (!content.startsWith('---')) {
        return { data: {}, body: content.trim() };
    }
    const endIdx = content.indexOf('\n---', 3);
    if (endIdx === -1) {
        return { data: {}, body: content.trim() };
    }
    const rawYaml = content.slice(3, endIdx).trim();
    const body = content.slice(endIdx + 4).trim();
    const data = parseYaml(rawYaml);
    return { data, body };
}

function parseMarkdownFile(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    return parseMarkdown(raw);
}

function readCollection(dirPath, exclude = ['section.md']) {
    if (!fs.existsSync(dirPath)) return [];
    const files = fs.readdirSync(dirPath);
    const items = [];

    for (const file of files) {
        if (!file.endsWith('.md')) continue;
        let isExcluded = false;
        for (const pattern of exclude) {
            if (pattern.includes('*')) {
                const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
                if (regex.test(file)) {
                    isExcluded = true;
                    break;
                }
            } else if (file === pattern) {
                isExcluded = true;
                break;
            }
        }
        if (isExcluded) continue;

        const fullPath = path.join(dirPath, file);
        const { data, body } = parseMarkdownFile(fullPath);
        items.push({
            _file: file,
            ...data,
            body: body || data.body || ''
        });
    }

    items.sort((a, b) => {
        if (typeof a.order === 'number' && typeof b.order === 'number') {
            return a.order - b.order;
        }
        return a._file.localeCompare(b._file);
    });

    return items;
}

function writeJsonFile(filePath, data) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function formatYamlScalar(val) {
    if (val === null || val === undefined) return 'null';
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    if (typeof val === 'number') return String(val);
    const s = String(val);
    if (/[\n\r\"'#:[\]{}*&!|>%@`,?]/.test(s) || s === '' || s === 'true' || s === 'false' || /^-?\d+(\.\d+)?$/.test(s)) {
        return JSON.stringify(s);
    }
    return s;
}

function stringifyYaml(obj, indentLevel = 0) {
    const indent = '  '.repeat(indentLevel);
    let yaml = '';

    if (Array.isArray(obj)) {
        for (const item of obj) {
            if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
                const entries = Object.entries(item);
                if (entries.length === 0) {
                    yaml += indent + '- {}\n';
                } else {
                    const [firstKey, firstVal] = entries[0];
                    if (Array.isArray(firstVal) && firstVal.length === 0) {
                        yaml += indent + '- ' + firstKey + ': []\n';
                    } else if (typeof firstVal === 'object' && firstVal !== null) {
                        yaml += indent + '- ' + firstKey + ':\n' + stringifyYaml(firstVal, indentLevel + 2);
                    } else {
                        yaml += indent + '- ' + firstKey + ': ' + formatYamlScalar(firstVal) + '\n';
                    }
                    for (let i = 1; i < entries.length; i++) {
                        const [k, v] = entries[i];
                        if (Array.isArray(v) && v.length === 0) {
                            yaml += indent + '  ' + k + ': []\n';
                        } else if (typeof v === 'object' && v !== null) {
                            yaml += indent + '  ' + k + ':\n' + stringifyYaml(v, indentLevel + 2);
                        } else {
                            yaml += indent + '  ' + k + ': ' + formatYamlScalar(v) + '\n';
                        }
                    }
                }
            } else {
                yaml += indent + '- ' + formatYamlScalar(item) + '\n';
            }
        }
        return yaml;
    }

    for (const [key, value] of Object.entries(obj)) {
        if (value === undefined) continue;
        if (value === null) {
            yaml += indent + key + ': null\n';
        } else if (typeof value === 'object') {
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    yaml += indent + key + ': []\n';
                } else {
                    yaml += indent + key + ':\n' + stringifyYaml(value, indentLevel + 1);
                }
            } else {
                const keys = Object.keys(value);
                if (keys.length === 0) {
                    yaml += indent + key + ': {}\n';
                } else {
                    yaml += indent + key + ':\n' + stringifyYaml(value, indentLevel + 1);
                }
            }
        } else {
            yaml += indent + key + ': ' + formatYamlScalar(value) + '\n';
        }
    }
    return yaml;
}

function writeMarkdownFile(filePath, frontmatterData, body = '') {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const yaml = stringifyYaml(frontmatterData).trim();
    const content = `---\n${yaml}\n---\n${body ? '\n' + body + '\n' : ''}`;
    fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = {
    parseYaml,
    stringifyYaml,
    parseMarkdown,
    parseMarkdownFile,
    readCollection,
    writeJsonFile,
    writeMarkdownFile
};
