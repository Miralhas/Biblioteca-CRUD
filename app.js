const Crud = require('./public/crud');
const crud = new Crud();
const bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'html');
app.use(express.static("views"));

app.get("/", function (req, res) {
  res.render("index");
})

app.post('/adicionar-livro', (req, res) => {
  const nomeLivro = req.body.nomeLivro;
  crud.inserir(nomeLivro);
  res.redirect('/');
});

app.post('/apagar-livro', (req, res) => {
  const livroId = req.body.livroId;
  crud.apagar(livroId);
  res.redirect('/');
});

app.post('/truncar-tabela', (req, res) => {
  crud.truncar();
  res.redirect('/');
});

app.post('/atualizar-livro', (req, res) => {
  const idLivro = req.body.idLivro;
  const novoNomeLivro = req.body.novoNomeLivro;
  crud.atualizar(idLivro, novoNomeLivro);
  res.redirect('/');
});


app.post('/mostrar-livros',  async (req, res) => {
  try {
      const livrosJson =  await crud.visualizar();
      const livros = JSON.parse(livrosJson);
      let string = "";

      if (!livros.length) string = "Nenhum livro encontrado!"
      else {
        for (let i = 0; i < livros.length; i++){
          // string = string + livros[i].id + ". " + livros[i].nomeLivro + "\\n";
          string += `${livros[i].id}. ${livros[i].nomeLivro} \\n`;
        }
      }

      res.send(`<script>alert(\`${string}\`); window.location.href = '/'; </script>`);
      
  } catch (error) {
      console.error("Erro ao buscar livros:", error);
      res.status(500).send("Erro ao buscar livros.");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor Express em execução na porta ${port}`);
});

