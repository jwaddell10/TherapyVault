var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signup", function(req, res, next) {
  console.log(req, 'this is req signup')
  res.json('it worked')
})

module.exports = router;
