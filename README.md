# rollup-plugin-userscript-header

A Rollup plugin to add userscript metadata blocks to files.

## Install

Using npm:
```console
npm install rollup-plugin-userscript-header --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import userscriptHeader from 'rollup-plugin-userscript-header';

export default {
    input: 'src/index.js',
    output: {
        dir: 'output',
        format: 'cjs'
    },
    plugins: [userscriptHeader()]
}
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

The metadata block will be filled in with the default fields found in `project.json`.

## Options

### `cwd`
Type: `String`<br>
Default: `process.cwd()`

Sets the directory of the package.json which is used for default values.

### `overwrite`
Type: `Object`<br>
Default: `null`

Values which will overwrite the default metablock.

```js
userscriptHeader({
    overwrite: {
        name: 'New Name',
        match: [
            'http://somedomainname.com',
            'http://anotherdomainname.com'
        ]
    }
})
```

## License
[LICENSE (MIT)](/LICENSE)