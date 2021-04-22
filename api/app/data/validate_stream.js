module.exports = function validateStream (payload) {
  var errors = {};
  if (!payload.newStream) {
    errors['newStream'] = 'MISSING';
  } else if (!payload.newStream.name) {
    errors['newStream.name'] = 'MISSING';
  }
  if (Object.keys(errors).length == 0) {
    return Promise.resolve(payload);
  } else {
    return Promise.reject(errors);
  }
}