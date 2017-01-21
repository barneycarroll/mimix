const wright      = require( 'wright' )
const rollup      = require( 'rollup' )
const nodeResolve = require( 'rollup-plugin-node-resolve' )
const commonJs    = require( 'rollup-plugin-commonjs' )

wright( {
  main  : 'index.html',
  debug : true,
  run   : 'm.redraw()',
  js   : {
    watch   : 'src/**/*.js',
    compile : () =>
      rollup.rollup( {
        entry   : 'src/index.js',
        plugins : [ nodeResolve(), commonJs() ]
      } )
      .then( x =>
        x.generate( { format : 'iife' } ).code
      )
  }
} )
