const mongoose = require('mongoose');

const hospedeDataShema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: Number,
    estado: String,
    cidade: String,
    endereco: String,
    cep: String,
    cpf: String,
    rgNumero: String,
    numeroReserva: Number,
    hotel: String,
});

module.exports = mongoose.model('hospedes', hospedeDataShema);