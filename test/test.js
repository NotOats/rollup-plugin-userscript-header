import path from 'path';
import test from 'ava';
import {rollup} from 'rollup';
import userscriptHeader from '../dist/index.js';

async function testBundle(bundle, t) {
    const { output } = await bundle.generate({ 
        format: 'cjs' 
    });
    
    const [{ code }] = output;

    t.snapshot(code);
}

test('default pkg header', async (t) => {
    const bundle = await rollup({
        input: path.join(__dirname, '/fixtures/main.js'),
        plugins: [userscriptHeader()]
    });

    await testBundle(bundle, t);
});

test('overwrite pkg header', async (t) => {0
    const bundle = await rollup({
        input: path.join(__dirname, '/fixtures/main.js'),
        plugins: [userscriptHeader({
            overwrite: {
                name: "Test Overwrite",
                description: "Overwriting the default header generation!",
                homepage: ''
            }
        })]
    });

    await testBundle(bundle, t);
});