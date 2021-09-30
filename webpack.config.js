module.exports = function (options) {
  options = {
    mode: process.env.APP_ENV === 'local' ? 'development' : 'production',
  };

  return {
    ...options,
    output: {
      libraryTarget: 'commonjs2',
    },
  };
};
