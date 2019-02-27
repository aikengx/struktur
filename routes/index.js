const express = require('express');
const router  = express.Router();
/*
const test = require('./test');

console.log(test)
test.testFunction('yo')
*/
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Struktur - Index',
    user: req.user
  });
});


module.exports = router;
