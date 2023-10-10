const mysql = require('mysql2');

class Crud {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "crud"
        });

        this.connection.connect(function(err) {
            if (err) {
                console.error("Erro ao conectar ao banco de dados:", err, "\n");
            } else {
                console.log("Conexão com o banco de dados estabelecida com sucesso!\n");
            }
        });
    }

    inserir(nomeLivro) {
        let sql = "INSERT INTO livro (nomeLivro) VALUES (?)";
        let dado = nomeLivro;
        this.connection.query(sql, dado, function (error, results, fields) {
            if (error) {
                console.error("Erro ao inserir dados:", error);
            } else {
                console.log("\nLivro: " + nomeLivro + " adicionado com sucesso!");
            }
        });
    }

    visualizar() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM livro";
            this.connection.query(sql, function(error, results, fields) {
                if (error) {
                    console.error("Erro ao visualizar!", error);
                    reject(error);
                } else {
                    // Transforma os resultados em um objeto JSON
                    const livros = JSON.stringify(results);
                    console.log(results);
                    resolve(livros);
                }
            });
        });
    }

    atualizar(cod, novoNome){
        let sql = "update livro set ? where id = ?"
        let dados = {id:cod, nomeLivro:novoNome}
        let id = dados.id
        this.connection.query(sql, [dados, id], function(error, results, fields){
            if (error){
                console.log("Erro ao atualizar!")
            } else {
                console.log("Livro atualizado com sucesso!")
            }
        })
    }

    apagar(id){
        let sql = "delete from livro where id = ?"
        this.connection.query(sql, id, function(error, results, fields){
            if (error) {
                console.log("\nErro ao deletar o livro de id: " + id)
            } else {
                console.log("\nLivro: " + id + " deletado com sucesso!");
            }
        })
    }

    truncar(){
        let sql = "truncate table livro"
        this.connection.query(sql, function(error, results, fields){
            if (error) {
                console.log("\nErro ao truncar a tabela!")
            } else {
                console.log("\nTabela truncada com sucesso!")
            }
        })
    }
}

module.exports = Crud;
