const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());

const mainRoutes = require('./routes/main.routes.js');
const dbRoutes = require('./routes/db.routes.js');
app.use(dbRoutes.saveSelectors);
app.use('/', mainRoutes);
app.use('/user', dbRoutes.router);

server.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});
