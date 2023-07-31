# vite-plugin-svg-combiner

Another SVG sprites plugin for Vite/Rollup. Inspired by [vite-plugin-svg-sprite](https://github.com/meowtec/vite-plugin-svg-sprite).

[![npm](https://img.shields.io/npm/v/vite-plugin-svg-combiner.svg)](https://www.npmjs.com/package/vite-plugin-svg-combiner)
[![npm](https://img.shields.io/npm/dt/vite-plugin-svg-combiner.svg)](https://www.npmjs.com/package/vite-plugin-svg-combiner)
[![npm](https://img.shields.io/npm/l/vite-plugin-svg-combiner.svg)](https://www.npmjs.com/package/vite-plugin-svg-combiner)

## Features

- Combine SVG files into one sprite file
- Support `runtime` and `file` mode
- Allow to customize symbol id
- Allow to customize sprite file name

## Install

```bash
npm i -D vite-plugin-svg-combiner
```

## Usage

```js
// vite.config.js
import { defineConfig } from 'vite'
import svgCombiner from 'vite-plugin-svg-combiner'

export default defineConfig({
  plugins: [
    svgCombiner({
      include: ['src/assets/icons/**/*.svg'],
    }),
  ],
})
```

## Options

### include

  - Type: `string | string[] | RegExp | RegExp[]`

    Files to be processed. See [@rollup/pluginutils](https://github.com/rollup/plugins/tree/master/packages/pluginutils#include-and-exclude).

  - Required

### exclude

  - Type: `string | string[] | RegExp | RegExp[]`

    Files to be excluded. See [@rollup/pluginutils](https://github.com/rollup/plugins/tree/master/packages/pluginutils#include-and-exclude).

  - Default: `undefined`

### emitFile

  - Type: `boolean | string`

    Whether to emit sprite file.

      - If `true`, which means `file` mode, the sprite file will be emitted to the output directory, the default sprite file name is `svg-sprite.svg`.
      - If `false`, which means `runtime` mode, the sprite file will be injected to the bundle. And insert to the DOM automatically.
      - If a string, the sprite file will be emitted to the specified path. The path is relative to the output directory.

  - Default: `false`

### symbolId

  - Type: `string | ((filePath: string) => string)`

    Customize symbol id.

      - If a string, the symbol id will be the specified string.
      - If a function, the symbol id will be the return value of the function.

    Some variables can be used in the string or function:

      - `[dirname]`: The directory name of the SVG file. eg: `a/b/c/d.svg` -> `a-b-c`.
      - `[name]`: The name of the SVG file. eg: `a/b/c/d.svg` -> `d`.

    When `symbolId` is a function, the function will be called with the SVG file path as the first argument. The SVG file path is relative to the `baseDir` option.

  - Default: `[name]`

### baseDir

  - Type: `string | ((id: string) => string)`

    The base directory of the SVG files. The SVG file path is relative to the `baseDir` option.

    When `baseDir` is a function, the function will be called with the absolute path of the SVG file as the first argument.

    You can set `baseDir` to empty string if you want to use the absolute path of the SVG file as the symbol id.

  - Default: `process.cwd()`

### svgoConfig

  - Type: `object | string`

    The [SVGO](https://github.com/svg/svgo#configuration) config. If a string, the config will be loaded from the specified file.

    Note: The loaded config will be merged with the default config using [deepmerge](https://github.com/TehShrike/deepmerge).

  - Default:

    ```js
    {
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: false, // keep viewBox attr
            },
          },
        },
        "cleanupIds", // clean up ids, we will use symbol id instead
        "removeDimensions", // remove width/height attributes, set viewBox instead
        "removeXMLNS", // remove xmlns attribute
      ],
    }
    ```

## Example

### Runtime mode

```js
// vite.config.js
import { defineConfig } from 'vite'
import svgCombiner from 'vite-plugin-svg-combiner'

export default defineConfig({
  plugins: [
    svgCombiner({
      include: ['src/assets/icons/*.svg'],
      emitFile: false,
    }),
  ],
})
```

### File mode

```js
// vite.config.js
import { defineConfig } from 'vite'
import svgCombiner from 'vite-plugin-svg-combiner'

export default defineConfig({
  plugins: [
    svgCombiner({
      include: ['src/assets/icons/*.svg'],
      emitFile: true, // or a string like 'assets/sprite.svg'
    }),
  ],
})
```

### Custom symbol id

```js
// vite.config.js
import { fileURLToPath } from "url";

import { defineConfig } from 'vite'
import svgCombiner from 'vite-plugin-svg-combiner'

export default defineConfig({
  plugins: [
    svgCombiner({
      include: ['src/assets/icons/**/*.svg'],
      symbolId: 'icon-[name]',
      baseDir: fileURLToPath(new URL('src/assets/icons', import.meta.url)),
    }),
  ],
})
```

### Custom symbol id function

```js
// vite.config.js
import { fileURLToPath } from "url";

import { defineConfig } from 'vite'
import svgCombiner from 'vite-plugin-svg-combiner'

export default defineConfig({
  plugins: [
    svgCombiner({
      include: ['src/assets/icons/**/*.svg'],
      symbolId: (filePath) => {
        // filePath do not contain directory
        if (!filePath.includes('/')) {
          return `icon-[name]`
        }

        return `icon-[dirname]-[name]`
      },
      baseDir: fileURLToPath(new URL('src/assets/icons', import.meta.url)),
    }),
  ],
})
```
### Custom svgo config

```js
// vite.config.js
import { fileURLToPath } from "url";

import { defineConfig } from 'vite'
import svgCombiner from 'vite-plugin-svg-combiner'

export default defineConfig({
  plugins: [
    svgCombiner({
      include: ['src/assets/icons/**/*.svg'],
      svgoConfig: fileURLToPath(new URL('svgo.config.js', import.meta.url)),
    }),
  ],
})
```
