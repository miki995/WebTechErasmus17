const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // paket koji se koristi za rad sa fajlovima unutar node servera

const app = express();

app.use('/assets', express.static(__dirname)); // definisanje rute za staticke fajlove (css, js, img) znaci kada zoves neki js fajl unutar html stavljas src="assets/imefajla.js" i ovo je razlog bio sto nece da nadje resources.js i resources.json


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) { // get ruta za prikazivanje htmla
    res.sendFile(__dirname + '/index.html', function (err) {

        if (err) {
            console.log(`[ERROR] : ${err}`);
        } else {
            console.log('[GET] Your file is loaded successfull.');
        }
    });
});

app.post('/', function (req, res) { // post ruta za upisivanje novih podataka
    console.log('[POST] Your file is loaded successfull.');

    fs.readFile(__dirname + '/resources.json', function (err, content) { // citanje fajla, mozes uraditi i funkciju ako fajl ne postoji da odmah radi writeFile, ovo je sve hardkodirano

        if (err) {
            return console.log(`[ERROR] : ${err}`);
        }

        let parseJson = JSON.parse(content); // cita sve podatke iz fajla

        parseJson.push(req.body); // dodaje na kraj nove podatke

        fs.writeFile(__dirname + '/resources.json', JSON.stringify(parseJson), function (err) { // upisuje nove podatke u onaj fajl

            if (err) {
                console.log(`[ERROR] : ${err}`);
            }
        });
    });

    console.log('Your cache file is updated successfull.'); // ovo je sve hardkodirano, ne znam kako tamo radi i to, ali ovo je nesto na brzinu :D
});

app.listen(8080, function () {
    console.log('Server is starting on port 8080.');
});
