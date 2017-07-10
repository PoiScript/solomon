const path = require('path')
const express = require('express')
const app = express()

const assets = path.resolve('public')

app.use(express.static(assets))

app.listen(8000, () => {
  console.log('Dev Server listening on port 8000!')
})
