'use strict';
// This "pings" MongoDB Atlas Service

import path from 'path';
import express from 'express';
import mongodb from 'mongodb';
import mongoose from 'mongoose';


const MongoClient = mongodb.MongoClient;

const username = encodeURIComponent("user");
const password = encodeURIComponent(process.env.MONGODB_PW);
const clusterName = "urltracker.3vcne2x";
const databaseName = "urlTracker";
const collectionName = "urlAccess";

const uri = `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/?retryWrites=true&w=majority`;

if (process.env.DEBUG === true) {
  console.log(`PW IS ${password}`);
  console.log(`URI IS ${uri}`);
}

const client = new MongoClient(uri);
try {
  client.connect(err => {
    if (err) throw new Error(`Fehler bei der Verbindung: ${err}`);
    const collection = client.db(databaseName).collection("urlAccess");
    // perform actions on the collection object
    console.log("!! VERBINDUNG ERFOLGREICH !!");
    client.close();
  });
} catch (err) {
    console.log(`FEHLER: ${err}`);
}

/*
async function initializeDatabase (uri) {
  try {
    await mongoose.connect(uri);
    const test = await mongoose.Connection;
    console.log(`${test.name}: Erfolgreich`);
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
}
*/
const app = express();
const port = parseInt(process.argv[2]) ? parseInt(process.argv[2]) : 8080;
const staticPath = path.join(path.dirname(process.argv[1]), path.join('client', 'src'));

app.use(express.static(staticPath));
// app.use(server);

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.sendFile(staticPath + '/index.html');
});

app.get('/index', (req, res) => {
  res.sendFile(staticPath + '/index.html');
});

app.get('/shorthtml', (req, res) => {
  res.sendFile(staticPath + '/shorten.html');
});

app.get('/kontakt', (req, res) => {
  res.sendFile(staticPath + '/kontakt.html');
});

app.get('/impressum', (req, res) => {
  res.sendFile(staticPath + '/impressum.html');
});

app.get('/datenschutz', (req, res) => {
  res.sendFile(staticPath + '/datenschutz.html');
});

/*
app.get('/guestlist', async (req,res)=>{
  const eventId = req.query.event ;
  if(!eventId){
    res.sendStatus(406);
  }
  try {
    const objId = mongoose.Types.ObjectId(eventId.toString());
    if (!(await Events.exists({ _id: objId }))) {
      res.sendStatus(404);
    } else {
      res.sendFile(staticPath + '/html/guestlist.html');
    }
  }
  catch (err) {
    res.sendStatus(404);
  }
});
*/

'use strict';

// Angenommen, UrlLibrary ist dein Mongoose-Modell
// const UrlLibrary = require('./deinPfadZurUrlLibrary');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

import crypto from 'crypto';
async function generateRandomValue() {
  const randomBytes = crypto.randomBytes(4); // Hier werden 4 Bytes verwendet, um 8 Zeichen zu erhalten
  const randomValue = randomBytes.toString('hex').toUpperCase(); // Hexadezimal in Großbuchstaben umwandeln

  return randomValue;
}

// Beispielaufruf
const randomValue = generateRandomValue();
console.log(randomValue);


// Mongoose-Modelle
const UrlLibrary = mongoose.model('urlLibrary', {
  short_url: String,
  long_url: String,
  timestamp: String
});
const time = new Date();
console.dir(time);

// Testdaten in die Datenbank einfügen
// test
console.log('test');
/*UrlLibrary.create([
  { short_url: 'asd', long_url: 'company', timestamp: '2024-01-05T08:07:16.265Z' }
]);*/

app.post('/shorten', async (req, res) => {
  const longUrl = req.body.longUrl;
  const timestamp = new Date();
  const randomValue = generateRandomValue();

  // console.log(`!! req.body is...${longUrl}`);
  res.status(200);
  /*
  UrlLibrary.create([
    { short_url: randomValue, long_url: 'company', timestamp: timestamp }
  ])
  .then((randomValue) => {
    res.status(200).json(randomValue);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  })*/
});

app.get('/s/:id', (req, res) => {
  const shortUrlParam = req.params.id;

  UrlLibrary.findOne({ short_url: shortUrlParam })
    .then((eintrag) => {
      if (!eintrag) {
        return res.status(404).send('Eintrag nicht gefunden');
      }
      res.json(eintrag);
      // res.redirect(eintrag.long_url);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

// Express-Routen
app.get('/showall', (req, res) => {
  Eintrag.find({}, (err, eintraege) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    res.json(eintraege);
  });
});



app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Bsp-App auf Port ${port} gestartet`);
  console.log(staticPath);
});
