const mongoose = require('mongoose');

const dbConfig = "mongodb+srv://admin:admin@koliadatabase.1dnjc.mongodb.net/KoliaControl?retryWrites=true&w=majority&appName=KoliaDataBase";

const connection = mongoose.connect(dbConfig);

module.exports = connection;