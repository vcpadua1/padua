// ─────────────────────────────────────────────────────────
//  server.js — Servidor principal da aplicação
//  Responsável por: configurar o Express, conectar ao MongoDB
//  e registrar todas as rotas do sistema.
// ─────────────────────────────────────────────────────────

// Carrega as variáveis do arquivo .env para process.env
require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const session      = require('express-session');
const metodoExtra  = require('method-override'); // permite usar PUT e DELETE em formulários HTML
const path         = require('path');


// Importa os arquivos de rotas
const rotasUsuario = require('./routes/rotas-usuario');
const rotasCarro   = require('./routes/rotas-carro');

const app  = express();
const PORTA = process.env.PORTA || 3000;

// ── CONFIGURAÇÃO DO MOTOR DE TEMPLATES ──────────────────
// Diz ao Express para usar EJS para renderizar as views (.ejs)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── MIDDLEWARES GLOBAIS ──────────────────────────────────
// Interpreta dados enviados por formulários HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Interpreta dados JSON enviados no corpo da requisição
app.use(express.json());

// Permite usar ?_method=PUT ou ?_method=DELETE nos formulários,
// já que HTML nativo só suporta GET e POST
app.use(metodoExtra('_method'));

// Serve arquivos estáticos da pasta /public (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// ── CONFIGURAÇÃO DE SESSÃO ───────────────────────────────
// Mantém o usuário logado entre as requisições usando cookies
app.use(session({
    secret: process.env.SEGREDO_SESSAO || 'segredo-local',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // sessão expira em 1 hora
}));

// ── CONEXÃO COM O MONGODB ────────────────────────────────
const uriMongo = process.env.MONGO_URI;

if (!uriMongo) {
    console.error('❌ MONGO_URI não encontrada no .env. Verifique o arquivo.');
    process.exit(1); // encerra o servidor imediatamente com mensagem clara
}

mongoose
    .connect(uriMongo)
    .then(() => console.log('✅ Conectado ao MongoDB com sucesso!'))
    .catch(erro => console.error('❌ Falha ao conectar ao MongoDB:', erro));
// ── ROTAS ────────────────────────────────────────────────
// Redireciona a raiz do site para a página de login
app.get('/', (req, res) => res.redirect('/usuario/login'));

// Registra todas as rotas relacionadas a usuários (cadastro, login, logout)
app.use('/usuario', rotasUsuario);

// Registra todas as rotas relacionadas a carros (listar, gerenciar, CRUD)
app.use('/carros', rotasCarro);

// ── INICIA O SERVIDOR ────────────────────────────────────
app.listen(PORTA, () => {
    console.log(`🚗 Servidor rodando em http://localhost:${PORTA}`);
});