const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { Usuario, Carro } = require('./database');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/html', express.static('html'));


// Página inicial
app.get('/', (req, res) => {
    res.redirect('/html/projects.html');
});


// LOGIN
app.get('/login', (req, res) => {
    res.render('login');
});


// CADASTRO USUARIO
app.get('/cadastro_usuario', (req, res) => {
    res.render('cadastro_usuario');
});


// CREATE USER
app.post('/salvar_usuario', async (req, res) => {

    const novoUsuario = new Usuario({
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha
    });

    await novoUsuario.save();

    res.redirect('/login');
});


// LISTAGEM CARROS
app.get('/carros', async (req, res) => {

    const carros = await Carro.find();

    res.render('carros', {
        carros
    });
});


// GERENCIAR CARROS
app.get('/gerenciar_carros', async (req, res) => {

    const carros = await Carro.find();

    res.render('gerenciar_carros', {
        carros
    });
});


// PAGINA CADASTRAR
app.get('/cadastrar_carro', (req, res) => {
    res.render('cadastrar_carro');
});


// CREATE CARRO
app.post('/salvar_carro', async (req, res) => {

    const novoCarro = new Carro({
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        qtde_disponivel: req.body.qtde_disponivel
    });

    await novoCarro.save();

    res.redirect('/gerenciar_carros');
});


// EDITAR
app.get('/editar_carro/:id', async (req, res) => {

    const carro = await Carro.findById(req.params.id);

    res.render('editar_carro', {
        carro
    });
});


// UPDATE
app.post('/atualizar_carro/:id', async (req, res) => {

    await Carro.findByIdAndUpdate(req.params.id, {
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        qtde_disponivel: req.body.qtde_disponivel
    });

    res.redirect('/gerenciar_carros');
});


// DELETE
app.get('/remover_carro/:id', async (req, res) => {

    await Carro.findByIdAndDelete(req.params.id);

    res.redirect('/gerenciar_carros');
});


// VENDER CARRO
app.get('/vender_carro/:id', async (req, res) => {

    const carro = await Carro.findById(req.params.id);

    if (carro.qtde_disponivel > 0) {

        carro.qtde_disponivel--;

        await carro.save();
    }

    res.redirect('/carros');
});


// SERVIDOR PORTA 80
app.listen(80, () => {
    console.log('Servidor rodando na porta 80');
});