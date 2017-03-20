'use strict'
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const http = require('http')
const fs = require('fs')
const path = require('path')
var router = express.Router();
const port = process.env.PORT || 8000

app.route('pets.json')
    .post((req, res) => {
        let body = req.params
        console.log(body);
        // fs.readFile('pets.json', 'utf8', (req, res) => {
        //     if (err) throw err
        //     let parsedData = JSON.parse(data)
        //     console.log(parsedData);
        // })
    })
    .get((req, res) => {

    })
    .patch((req, res) => {

    })
    .delete((req, res) => {

    })









app.listen(port, (err) => {
    if (err) throw err
    console.log("doing the listening on port " + port)
})
module.exports = app
