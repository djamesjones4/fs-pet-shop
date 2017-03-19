'use strict'
const fs = require('fs')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser');
const express = require('express')
var app = express()
var router = express.Router();
const port = process.env.PORT || 8000

app.use((req, res)=> {
  let pathname = req.url
  let pathArray = pathname.split('/')
  console.log('req.url', req.url);

  console.log('path array', pathArray);
  console.log('index', typeof pathArray[2]);
  // pathname = pathname.replace(/^\//, '') // ^ tells to do only first \
  if (pathArray[1] === 'pets' && pathArray[2] === undefined) {
      fs.readFile('pets.json', 'utf8', (err, data) => {
          if (err) throw err
          let parsedData = JSON.parse(data)
          console.log('parsed data', parsedData);
          res.setHeader('Content-Type', 'application/json')
          res.end(data)
      })
  } else if (pathArray[1] === 'pets' && +pathArray[2] === 0) {
      console.log('we got this far');
      fs.readFile('pets.json', 'utf8', (err, data) => {
          if (err) throw err
          let parsedData = JSON.parse(data)
          console.log('parsed data', parsedData);
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(parsedData[0]))
      })
  } else if (pathArray[1] === 'pets' && +pathArray[2] === 1) {
      fs.readFile('pets.json', 'utf8', (err, data) => {
          if (err) throw err
          let parsedData = JSON.parse(data)
          console.log('parsed data', parsedData);
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(parsedData[1]))
      })

  } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end('Not Found')
  }

})


app.listen(port, function(err) {
    if (err) throw err
    console.log("doing the listening on port " + port)
})
module.exports = app
