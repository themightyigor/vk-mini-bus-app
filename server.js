const express = require('express');
const request = require('request');

const app = express();

const API_KEY = '365aff1e-08cb-4bd2-bfa3-16a2eb089e0e';

app.get('/api/departures/:from/:to', function(req, res) {
  const API_URL = 'https://api.rasp.yandex.net/v3.0/search/';

  const properties = {
    apikey: API_KEY,
    from: req.params.from,
    to: req.params.to,
    transport_types: 'bus'
  };

  req
    .pipe(
      request({
        method: 'GET',
        uri: API_URL,
        qs: properties
      })
    )
    .pipe(res);
});

app.get('/api/details/:uid', function(req, res) {
  const API_URL = 'https://api.rasp.yandex.net/v3.0/thread/';

  const properties = {
    apikey: API_KEY,
    uid: req.params.uid
  };

  req
    .pipe(
      request({
        method: 'GET',
        uri: API_URL,
        qs: properties
      })
    )
    .pipe(res);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
