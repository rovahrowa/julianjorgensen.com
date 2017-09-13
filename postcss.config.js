module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
      path: 'app/styles'
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-remify': {},
    'postcss-cssnext': {}
  },
};
