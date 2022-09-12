const axios = require('axios');

axios.post('http://localhost:7181/signup', {
  username: 'mirel42',
  password: '69420'
}).then(res => console.log(res.data));