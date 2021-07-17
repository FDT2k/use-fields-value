/**
 * Adapted from https://github.com/reduxjs/redux/blob/master/rollup.config.js
 */

import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import includePaths from 'rollup-plugin-includepaths';
import copy from 'rollup-plugin-copy';

let includePathOptions = {
    include: {},
    paths: ['src'],
    external: [],
    extensions: ['.js', '.json', '.html']
};


const defaultOutputOptions = {
  format: 'cjs',
  indent: false,
  sourcemap: false,
  exports: 'named',
}


const external = ['chalk','is-dom', 'prop-types',
'react','@geekagency/composite-js','@geekagency/gen-classes',
'formik','react-input-mask','react-icons','react-icons/fa',
'react-icons/md','react-icons/libs','react-loading','react-draggable','react-icons/lib'];


const plugins = [

  commonjs({
    include: 'node_modules/**',
  }),
  babel(),
  includePaths(includePathOptions),

];



const defaultFormat = {
  format: 'cjs',
  indent: false,
  sourcemap: false,
  exports: 'named',
}


const defaultConf = {
  external,
  plugins
}


const make_pkg = (input, output,more_plugins=[]) => {
  return Object.assign({}, defaultConf, {
                                          input,
                                          output: Object.assign({}, defaultOutputOptions, { file: output }),
                                          plugins:[...plugins,...more_plugins]
                                        }
  );
}

const copy_package_json = target =>copy({
  targets: [
    { src: 'package.json', dest: target }
  ]
});



export default [
  make_pkg('src/index.js','dist/index.js'),

]
