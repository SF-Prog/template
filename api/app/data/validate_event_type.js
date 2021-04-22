module.exports = function validateEvent(payload) {
  var errors = {};
  if(!payload.newEvent){
    errors['newEvent'] = 'MISSING'
  }
  else{ //si hay payload.event
    if(!payload.newEvent.name){
      errors['newEvent.name'] = 'MISSING'
    }

    if(!payload.newEvent.fields){
      errors['newEvent.fields'] = 'MISSING'
    }
    else if(payload.newEvent.fields.length == 0){
      errors['newEvent.fields'] = 'EMPTY'
    }
    else {
      payload.newEvent.fields.forEach(function (field) {
        if (!field.name) errors['newEvent.fields.name'] = 'MISSING';
      });
    }
  }

  if(Object.keys(errors).length == 0){
    return Promise.resolve(payload);
  } else {
    return Promise.reject(errors)
  }
}
