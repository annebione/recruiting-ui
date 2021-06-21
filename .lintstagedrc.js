module.exports = {
  '*.js': ['eslint --fix --quiet', 'prettier --write'],
  '*.{css,json,md}': ['prettier --write'],
};
