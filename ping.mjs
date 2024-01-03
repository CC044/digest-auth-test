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
const staticPath = path.join(path.dirname(process.argv[1]), path.join('render', 'project', 'client', 'dist')); // Pfad aendern falls /index.mjs zu /server/expressBasis.js wird -> '../client/dist/'

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

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Bsp-App auf Port ${port} gestartet`);
  console.log(staticPath);
});
