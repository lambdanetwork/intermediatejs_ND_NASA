require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.get('/rover', async (req, res) => {
    try {
        const roverName = req.query.rover_name.toLowerCase();
        if(!roverName) {
            return res.status(400).end();
        }
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1000&camera=fhaz&api_key=${process.env.API_KEY}`
        console.log(roverName)
        console.log(url)
        let image = await fetch(url)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))