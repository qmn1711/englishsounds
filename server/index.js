const express = require('express');
const app = express();
const path = require('path');
const proxy = require('express-http-proxy');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
// app.get('/api', function (req, res) {
//   res.set('Content-Type', 'application/json');
//   res.send('{"message":"Hello from the custom server!"}');
// });

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  // res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  // res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, app_key, app_id');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  return next();
});

app.use('/proxy', proxy('https://od-api.oxforddictionaries.com:443', {
  proxyReqOptDecorator: function (proxyReqOpts) {
    proxyReqOpts.headers.Accept = 'application/json';
    proxyReqOpts.headers.app_id = 'ded9a1dd';
    proxyReqOpts.headers.app_key = '189ce898089c22f3d2ecd1515b848b0e';
    return proxyReqOpts;
  }
}));

app.use('/audio', proxy('http://audio.oxforddictionaries.com'));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running at :' + port);
});
