const axios = require('axios');

axios.post('http://localhost:7181/auth', {
  token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2MDIwODI1OCwiZXhwIjoxNjYwODEzMDU4fQ.ECmFimBl0jv4MLHi278Wtx932tjacXo-WN1JDTr-nQ9nVlq2becZGifHKAGo45xGEvDiPs7lFQmEBpLwvEAMrA'
}).then(res => {
  console.log(res.data.user);
});