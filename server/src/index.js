const express = require('express');
const routes = require('./api/endPoints');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
}));

app.use(bodyParser.json());

app.use('/', routes);

app.listen(3001, () => {
    console.log(`Example app listening on port ${3001}`)
});