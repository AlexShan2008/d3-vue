let obj = {
  key: 'name'
}

Object.defineProperty(obj, 'key', {
  enumerable: true,
  configurable: true,
  set: function () {
    console.log('set');

  },
  get: function () {
    console.log('set');
    return 'aaa'
  },
})
obj.key = ''
console.log(obj.key);