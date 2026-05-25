// ─────────────────────────────────────────────────────────
//  models/Usuario.js — Schema da coleção "usuarios"
//  Define a estrutura e as regras dos documentos de usuário
//  que serão salvos no banco de dados MongoDB.
// ─────────────────────────────────────────────────────────

const mongoose = require('mongoose');

// ── ESTRUTURA DO DOCUMENTO ───────────────────────────────
// Cada campo define: tipo de dado, obrigatoriedade e restrições
const esquemaUsuario = new mongoose.Schema(
    {
        // Nome completo do usuário
        nome: {
            type: String,
            required: [true, 'O nome é obrigatório'],
            trim: true // remove espaços extras no início e no fim
        },

        // Login usado para entrar no sistema — deve ser único
        login: {
            type: String,
            required: [true, 'O login é obrigatório'],
            unique: true, // não permite dois usuários com o mesmo login
            trim: true,
            lowercase: true // salva sempre em minúsculas para evitar duplicatas
        },

        // Senha do usuário
        // ⚠️ Em produção real, use bcrypt para criptografar a senha antes de salvar
        senha: {
            type: String,
            required: [true, 'A senha é obrigatória']
        }
    },
    {
        // Adiciona automaticamente os campos createdAt e updatedAt em cada documento
        timestamps: true
    }
);

// Exporta o modelo para ser usado nas rotas
module.exports = mongoose.model('Usuario', esquemaUsuario);