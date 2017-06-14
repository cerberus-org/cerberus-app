const express = require('express');
const request = require('request');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all media
router.get('/media', (req, res) => {
  // Get media from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  request('https://www.instagram.com/tlmader/media/', function (error, response, body) {
    if (error) {
      res.status(500).send(error)
    } else if (response.statusCode === 200) {
      res.status(200).send(JSON.parse(body));
    }
  })

});

module.exports = router;
