
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    // render / invoke views/index.ejs
    res.render('index');
});

app.post('/', function(req, res) {
    let apiKey = 'f2dd7bd7e1573052110ba649de12d3cf';
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=matric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${+weather.main.temp / +10} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});

app.listen(3000, function() {
    console.log('listening on port 3000');
});
