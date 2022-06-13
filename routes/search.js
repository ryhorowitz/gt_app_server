const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
  res.send('Hello from search router!')
})

module.exports = router;