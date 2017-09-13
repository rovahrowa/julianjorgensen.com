module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
      path: __dirname + '/app/styles'
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-remify': {},
    'postcss-cssnext': {}
  },
};
