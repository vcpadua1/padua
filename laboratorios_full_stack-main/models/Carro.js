// ─────────────────────────────────────────────────────────
//  models/Carro.js — Schema da coleção "carros"
//  Define a estrutura e as regras dos documentos de carro
//  que serão salvos no banco de dados MongoDB.
// ─────────────────────────────────────────────────────────

const mongoose = require('mongoose');

// ── ESTRUTURA DO DOCUMENTO ───────────────────────────────
const esquemaCarro = new mongoose.Schema(
    {
        // Marca do fabricante (ex: Toyota, Honda, Ford)
        marca: {
            type: String,
            required: [true, 'A marca é obrigatória'],
            trim: true
        },

        // Modelo do veículo (ex: Corolla, Civic, Ka)
        modelo: {
            type: String,
            required: [true, 'O modelo é obrigatório'],
            trim: true
        },

        // Ano de fabricação do veículo
        ano: {
            type: Number,
            required: [true, 'O ano é obrigatório'],
            min: [1900, 'Ano inválido'],
            max: [new Date().getFullYear() + 1, 'Ano não pode ser no futuro']
        },
        foto: {
            type: String,
            default: null // null pra sempre ficar sem foto 
        },

        // Quantas unidades estão disponíveis no estoque
        // Quando chegar a zero, o carro é marcado como "Esgotado"
        quantidade_disponivel: {
            type: Number,
            required: [true, 'A quantidade é obrigatória'],
            default: 0,
            min: [0, 'Quantidade não pode ser negativa']
        }
    },
    {
        // Adiciona automaticamente createdAt e updatedAt
        timestamps: true
    }
);

// Exporta o modelo para ser usado nas rotas
module.exports = mongoose.model('Carro', esquemaCarro);