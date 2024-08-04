const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const metricsRouter = require('./metrics'); // import the metrics router
const path = require('path');

// Serve static files

const cors = require('cors')
app.use(cors())


// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Routes
app.use('/portfolio', metricsRouter);

const PORT = process.env.PORT || 9091;

app.listen(PORT, () => {
  console.log('Server listening on port 9091');
});
