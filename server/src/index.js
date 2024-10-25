const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const connection = require('./config/dbConfig')

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3000, () => {
    console.log("rodando na porta 3000")
});