const express = require('express');

const app = express();
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const bodyParser = require('body-parser');
const routerContact = require('./routes/contact');

const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 30,
});
app.use(limiter);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routerContact);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server was lisned at port : ${PORT}`);
});
