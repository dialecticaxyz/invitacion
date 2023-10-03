const cors = require('cors')
const path = require('path');
const express = require('express');
const app = express();
const router = require('./routes/routes.js');
const hbs = require('hbs');

app.set('port', process.env.PORT || 80);
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname,'public')));
app.use(cors())
app.use(express.json()); 
app.use('/', router);




const server = app.listen(app.get('port'),()=>{ 
  console.log("http://127.0.0.1:"+server.address().port) 
});

