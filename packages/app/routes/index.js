const express = require('express'),
  router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  const currentServerTime = (new Date()).getTime()
  res.render('index', { title: 'CryptoZoo', currentServerTime })
})

router.get('/feed', (req, res) => {
  const currentServerTime = (new Date()).getTime()
  res.render('feed', { title: 'CryptoZoo', bodyclass: 'feed', currentServerTime })
})

router.get('/my-feed', (req, res) => {
  const currentServerTime = (new Date()).getTime()
  res.render('my-feed', { title: 'CryptoZoo', bodyclass: 'feed', currentServerTime })
})

router.get('/account', (req, res) => {
  const currentServerTime = (new Date()).getTime()
  res.render('account', { title: 'CryptoZoo - Manage Account', currentServerTime })
})

router.get('/bank', (req, res) => {
  const currentServerTime = (new Date()).getTime()
  res.render('bank', { title: 'CryptoZoo - Bank', currentServerTime })
})
module.exports = router;