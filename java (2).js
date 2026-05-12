const express = require('express');
const path = require('path');

const {
    criarTabela,
    cadastrarPost,
    buscarPosts
} = require('./db/database');

const app = express();

// PORTA 80
const PORT = 80;

// configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// arquivos estáticos
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// criar tabela
criarTabela();

// ROTA PADRÃO -> Projects.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Projects.html'));
});

// acessar blog
app.get('/blog', async (req, res) => {

    const posts = await buscarPosts();

    res.render('blog', { posts });
});

// formulário de cadastro
app.get('/cadastrar_post', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastrar_post.html'));
});

// cadastrar post
app.post('/salvar_post', async (req, res) => {

    const { titulo, resumo, conteudo } = req.body;

    await cadastrarPost(titulo, resumo, conteudo);

    res.redirect('/blog');
});

// iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});