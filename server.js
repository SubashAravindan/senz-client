const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config');
const routes = require('./routes');


const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
