var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.send({
    data:[],
    code:200,
    message:"1.2"
  })
});
router.get('/', function(req, res, next) {
  res.send({
    data:[],
    code:200,
    message:"success"
  })
});

module.exports = router;
