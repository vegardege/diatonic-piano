import babel from '@rollup/plugin-babel';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/diatonic-piano.js',
      format: 'umd',
      name: 'diatonic-piano',
      globals: {
        react: 'React'
      }
    },
    external: [
      'react'
    ],
    plugins: [
      babel({babelHelpers: 'bundled'})
    ]
  }
]
