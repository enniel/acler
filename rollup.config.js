'use strict'

/**
 * acler
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const pkg = require('./package.json')

module.exports = [
  // browser-friendly UMD build
  {
    input: 'src/Acl.js',
    output: {
      name: 'acler',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      commonjs(),
      babel({
        plugins: ['@babel/external-helpers']
      })
    ]
  },
  // ES module (for bundlers)
  {
    input: 'src/Acl.js',
    output: {
      name: 'acler',
      file: pkg.module,
      format: 'es'
    },
    plugins: [
      commonjs(),
      babel({
        plugins: ['@babel/external-helpers']
      })
    ]
  },
  // CommonJS module (for Node)
  {
    input: 'src/Acl.js',
    output: {
      name: 'acler',
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [
      babel({
        plugins: ['@babel/external-helpers']
      })
    ]
  }
]
