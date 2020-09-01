module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { browsers: 'last 2 versions'}}
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    'react-hot-loader/babel'
  ]
}
