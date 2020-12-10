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


const { Map } = require('immutable');
const RoverDB = Map({});

app.get('/apod', async (req, res) => {
    try {
        const image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

const getImageUrl = (roverName, sol) =>`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&camera=fhaz&api_key=${process.env.API_KEY}`;
app.get('/rover', async (req, res) => {
    try {
        const roverName = req.query.rover_name.toLowerCase();
        if(!roverName) {
            return res.status(400).end();
        }

        const roverDetailDB = RoverDB.get(roverName);
        if(roverDetailDB){
            return res.json(roverDetailDB)
        }

        const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}?api_key=${process.env.API_KEY}`;
        const result = await fetch(url).then(res => res.json());
        const latestDatePhotoManifest = result.photo_manifest.photos
            .sort((a,b) => {
                return new Date(b.earth_date).getTime() - new Date(a.earth_date).getTime()
            })
            .slice(0,5)
            .map(obj => {
                return fetch(getImageUrl(roverName, obj.sol))
                        .then(res => res.json())
                        .then(obj => obj.photos)
            })
        
        const latestImages = (await Promise.all(latestDatePhotoManifest)).flat();
        result.photo_manifest.photos = latestImages;
        res.json(result);

        // update db
        RoverDB.set(roverName, result);
    } catch (err) {
        console.log('error:', err);
        res.status(500).end();
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))