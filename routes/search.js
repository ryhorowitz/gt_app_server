const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
  res.json({data: 'Hello from search router!'})
})

module.exports = router;