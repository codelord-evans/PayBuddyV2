const express = require('express')
const router = express.Router()
const path = require('path')
const app = require('../server');
app.use('/', require('./routes/root'))
app.use('/payments', require('./routes/payments'))
app.use('/index', require('./routes/index'))


router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router