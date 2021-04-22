function makeHttpRequest(input){
  return fetch(API_URL + input.path, {
    method : 'POST',
    body : input.body
  }).then(function(response) {
    return response.json()
  })
}
