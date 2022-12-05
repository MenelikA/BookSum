const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


// Create express app
const app = express();

// middleware

// cors - allows us to make requests from our frontend to our backend
app.use(cors());

// body-parser - allows us to parse the body of incoming requests
// limit - limits the size of the body to 50mb
// high limit to accomodate for large images
app.use(bodyParser.json({
    limit: '50mb'
}));

// routes
app.get('/api', (req, res) => {
    res.send('Hello from the API!');
});

// router middleware
app.use('/api/books', require('./routes/books'));
app.use('/api/reviews', require('./routes/reviews'));

// start the server
app.listen(3001, () => {
    console.log('Listening on port 3001');
});