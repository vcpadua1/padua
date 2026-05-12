const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/carros_db');

const UsuarioSchema = new mongoose.Schema({
    nome: String,
    login: String,
    senha: String
});

const CarroSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    ano: Number,
    qtde_disponivel: Number
});

const Usuario = mongoose.model('usuarios', UsuarioSchema);
const Carro = mongoose.model('carros', CarroSchema);

module.exports = {
    Usuario,
    Carro
};