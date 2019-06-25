import {
  terser
} from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssCopy from 'postcss-copy';
import alias from 'rollup-plugin-alias';


let plugin = require('../package.json');
let path = require('path');

let input = "src/app.js";
let output = {
  file: "dist/bundle-src.js",
  format: "umd",
  sourcemap: true,
  name: 'app',
};

let plugins = [
  alias({
    'jszip': path.join(__dirname, './../node_modules/jszip/dist/jszip.min.js'),
    // 'leaflet-kmz': path.join(__dirname, './../node_modules/leaflet-kmz/dist/leaflet-kmz-src.js'),
  }),
  resolve(),
  commonJS({
    include: '../node_modules/**',
  })
];

export default [{
    input: input,
    output: output,
    plugins: plugins,
  },
  {
    input: input,
    output: Object.assign({}, output, {
      file: "dist/bundle.js"
    }),
    plugins: plugins.concat(terser()),
  },
  {
    input: 'src/app.css',
    output: {
      file: 'dist/bundle.css',
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        inject: false,
        minimize: true,
        plugins: [
          postcssImport({}),
          postcssCopy({
            basePath: 'node_modules',
            dest: "dist",
            template: "images/[path][name].[ext]",
          })
          // postcss_url(),
          // postcss_url({
          //      url: "copy",
          //      basePath: path.resolve("."),
          //      assetPath: "resources"
          // })
        ]
      })
    ]
  },
];
