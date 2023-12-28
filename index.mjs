'use strict';
import path from 'path';
import express from 'express';

const app = express();
const port = parseInt(process.argv[2]) ? parseInt(process.argv[2]) : '8080';
const staticPath = path.join(path.dirname(process.argv[1]), path.join('client', 'dist')); // Pfad aendern falls /index.mjs zu /server/expressBasis.js wird -> '../client/dist/'

app.use(express.static(staticPath));
app.use(server);

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
