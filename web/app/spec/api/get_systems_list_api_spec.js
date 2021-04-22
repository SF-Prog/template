describe('getSystemsListAPI', function () {
    function makeHttpRequest (params) {
      makeHttpRequest.params = params;
      makeHttpRequest.result = {
        systems: [
          { name: Math.random(), _id: Math.random() },
          { name: Math.random(), _id: Math.random() },
          { name: Math.random(), _id: Math.random() },
          { name: Math.random(), _id: Math.random() }
        ]
      };
      return Promise.resolve(makeHttpRequest.result);
   }

   it('calls getSystems api', function (done) {
    var payload = {};
    var fn = getSystemsListApi(makeHttpRequest);
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/get_systems',
        body: JSON.stringify({})
      })
      expect(response.systems).toEqual(makeHttpRequest.result.systems)
      expect(response).toBe(payload)
    })
    done();
  })
});
