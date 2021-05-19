const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyparser = require('body-parser');
var cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.json({
    type: ['application/json', 'text/plain']
}));
app.use(cors());

const router = require('./router');
app.use(router);

server.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});
