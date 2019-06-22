import {
  terser
} from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import css from 'rollup-plugin-css-only';

// const replace = require('rollup-plugin-replace');
let plugin = require('../package.json');

let input = "src/app.js";
let output = {
  file: "dist/bundle-src.js",
  format: "umd",
  sourcemap: true,
  name: 'app',
};

let external = ['leaflet'];
let plugins = [
  alias({
    'jszip': './../node_modules/jszip/dist/jszip.min.js', // TODO: add { "module": "./dist/jszip.js" } in their package.json
    // 'leaflet-gesture-handling': './../node_modules/leaflet-gesture-handling/dist/leaflet-gesture-handling.js',
    'leaflet-kmz': './../node_modules/leaflet-kmz/dist/leaflet-kmz-src.js'
  }),
  // replace({
  //   include: './../node_modules/leaflet-gesture-handling/dist/leaflet-gesture-handling.js',
  //   values: {
  //     'global': 'window'
  //   }
  // }),
  resolve(),
  commonJS({
    include: './../node_modules/**'
  }),
  css({
    output: 'dist/bundle.css'
  }),
];
// let moduleContext = {
//   [require.resolve('leaflet-gesture-handling')]: 'window'
// };

export default [{
    input: input,
    output: output,
    plugins: plugins,
    external: external,
    // moduleContext: moduleContext
  },
  {
    input: input,
    output: Object.assign({}, output, {
      file: "dist/bundle.js"
    }),
    plugins: plugins.concat(terser()),
    external: external,
    // moduleContext: moduleContext
  },
];
