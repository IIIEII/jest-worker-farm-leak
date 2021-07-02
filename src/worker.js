module.exports.hello = function hello(param) {
  return ['Hello', ...Array(100000).fill(param)];
}