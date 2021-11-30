// contants
const express = require('express')
const app = express()
const port = 4000
//body parser
const bodyParser = require('body-parser')

//navigates path
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));



// allows to make request from outside domain
// const cors = require('cors');
// app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//mongoose
const mongoose = require('mongoose');

//connection string to mongo db
const strConnection = 'mongodb+srv://admin:admin@cluster0.rmvvh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

main().catch(err => console.log(err));

//connects to database
async function main() {
    await mongoose.connect(strConnection);
}

const movieSchema = new mongoose.Schema({
    Title: String,
    Year: String,
    Poster: String
});

const movieModel = mongoose.model('shannon', movieSchema);


// listening for get method request
app.get('/', (req, res) => {
    res.send('Welcome to Data Representation & Querying')
})


//posts new movie data to console
app.post('/api/movies', (req, res) => {
    console.log(req.body);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);
    //create new movie
    movieModel.create({
        Title: req.body.Title,
        Year: req.body.Year,
        Poster: req.body.Poster
    });
    //message to confirm data is sent to server
    res.send('Data Sent to Server');
})
//displays movie info at the url + id
app.get('/api/movies/:id', (req, res) => {
    console.log(req.params.id);

    movieModel.findById(req.params.id, (error, data) => {
        res.json(data);
    })
})

app.put('/api/movies/:id', (req, res) => {
    // console log to say updating
    console.log("Updating: " + req.param.id);

    movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        // callback function
        (err, data) => {
            // function that executes to send data
            res.send(data);
        })
})

// displays movie array at /api/movies URL
app.get('/api/movies', (req, res) => {

    movieModel.find((err, data) => {
        res.json(data);
    })
    // "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"



})

// deletes movie by id
app.delete('/api/movies/:id', (req, res) => {
    console.log('Deleting: ' + req.params.id);

    movieModel.deleteOne({ _id: req.params.id },
        (error, data) => {
            if (error)
                res.send(data);
            res.send(data);
        })
})

//handles requests that dont match previous ones 
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
    });

// port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})