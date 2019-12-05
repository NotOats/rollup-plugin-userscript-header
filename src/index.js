import {readFileSync} from 'fs';
import path from 'path';
import MagicString from 'magic-string';
import {stringify} from 'userscript-meta';

export default function userscriptHeader(options = {}) {
    const cwd = options.cwd || process.cwd();
    const pkgFile = path.join(cwd, 'package.json');
    const pkg = JSON.parse(readFileSync(pkgFile, 'utf8'))
    const overwrite = options.overwrite || undefined;

    return {
        name: 'userscript-header',
        renderChunk(code, chunk) {
            const header = createHeaderString(pkg, overwrite);
            const str = new MagicString(code);
            str.prepend(header)

            return {
                code: str.toString(),
                map: str.generateMap({
                    source: chunk.fileName,
                    hires: true
                })
            };
        }
    };
}

function createHeaderString(pkg, overwrite) {
    const defaultHeader = {
        name: pkg.name || '',
        version: pkg.version || '',
        author: pkg.author || '',
        description: pkg.description || '',
        homepage: pkg.homepage || '',
        supportURL: typeof pkg.bugs === 'string' ? pkg.bugs : '',
        match: '*://*/*',
    };

    const createdHeader = Object.assign({}, 
        defaultHeader, 
        (typeof overwrite === 'object' ? overwrite : {})
    );

    const header = trimFalsyProperties(createdHeader);

    return stringify(header);
}

function trimFalsyProperties(obj) {
    if (Array.isArray(obj)) {
        const filtered = obj.filter(Boolean);
        return filtered.length > 0 ? filtered : undefined;
    }

    if (typeof obj === 'string') {
        return obj.trim() || undefined;
    }

    if(typeof obj === 'object') {
        const filtered = Object.entries(obj)
            .filter(([,val]) => Boolean(trimFalsyProperties(val)));
        
        if(filtered.length > 0) {
            return filtered.reduce((newObj, [key, value]) => {
                newObj[key] = value;
                return newObj;
            }, {});
        }

        return undefined;
    }

    return obj;
}
