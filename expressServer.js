'use strict'
const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
var args = process.argv


app.use ((req, res) => {
    let pathname = req.url
    console.log('pathname', pathname);
    let pathArray = pathname.split('/')
    console.log('req.url', req.url);

    console.log('path array', pathArray);
    console.log('index', typeof pathArray[2]);

    if (pathArray[1] === 'pets' && pathArray[2] === undefined) {
      console.log('in pets');
        fs.readFile('pets.json', 'utf8', (err, data) => {
            if (err) throw err
            let parsedData = JSON.parse(data)
            console.log('parsed data', parsedData);
            res.setHeader('Content-Type', 'application/json')
            res.send(parsedData)
        })
    } else if (pathArray[1] === 'pets' && +pathArray[2] === 0) {
        console.log('we got this far');
        fs.readFile('pets.json', 'utf8', (err, data) => {
            if (err) throw err
            let parsedData = JSON.parse(data)
            console.log('parsed data', parsedData);
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(parsedData[0]))
        })
    } else if (pathArray[1] === 'pets' && +pathArray[2] === 1) {
        fs.readFile('pets.json', 'utf8', (err, data) => {
            if (err) throw err
            let parsedData = JSON.parse(data)
            console.log('parsed data', parsedData);
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(parsedData[1]))
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
