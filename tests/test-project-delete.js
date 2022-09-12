const axios = require('axios');

axios.post('http://localhost:7181/sketches/delete', {
  token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2Mjk1OTU1OCwiZXhwIjoxNjYzNTY0MzU4fQ.G6zOkxV0aMyC-D8rikUUL_zBtjdoI1fAAg7mrNTA1e5bvWVAsQ1aObA0tYv-d0W_M0YBWog1ax0Q2JwWxnwkgQ',
  sketchId: 1
}).then(res => {
  console.log(res.data);
});