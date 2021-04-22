module.exports = function validateSystem (payload) {
  var errors = {};
  if (!payload.newSystem) {
    errors['newSystem'] = 'MISSING';
  } else {
    if (!payload.newSystem.name) {
      errors['newSystem.name'] = 'MISSING';
    }   
  } 
  if (Object.keys(errors).length == 0) {
    return Promise.resolve(payload);
  } else {
    return Promise.reject(errors);
  }
} 
