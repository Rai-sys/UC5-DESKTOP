/* Importando com (commonjs) */
//import express from 'express';     // <-- express tipo module
const express = require('express');  // <-- express tipo commonjs (javascript comum)
const dotenv = require('dotenv');    // <-- dotenv tipo commonjs (javascript comum)
// import dotenv from 'dotenv';      // <-- dotenv tipo module

dotenv.config();

const port = process.env.PORTA;
const app = express();

/* aplicação use express como json(javascript object notation) */
app.use(express.json()); 

/* banco de dados do sistema */
const bancoDados = [];

/* pegar todos os produtos do banco de dados */
app.get('/produtos', (requisicao, resposta) => {
  // tratamento de exceções
  try {
    if (bancoDados.length === 0) {   // <-- verificar se o banco de dados está vazio
      return resposta.status(200).json({mensagem: "Banco de dados vazio."})
    }
    resposta.status(200).json(bancoDados);  // <-- mostrar o banco caso >>nao esteja<< vazio
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao buscar produtos", erro: error.message})
  }
});

/* pegar produto pelo id */
app.get('/produtos/:id', (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;  // <-- pegar id pelo parametro
    const produto = bancoDados.find(elemento => elemento.id === id);  // <-- verificar se o id do produto é o mesmo do parametro
    if (!produto) {  // <-- se nao encontrar o produto
      return resposta.status(404).json({mensagem: "Produto não encontrado"})
    };
    resposta.status(200).json(produto);  // <-- resposta quando encontrar o produto
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao buscar produtos", erro: error.message})
  };
});

/* criando um recurso (produto) no servidor */
app.post('/produtos', (requisicao, resposta) => {
  try {
    const { id, nome, preco } = requisicao.body; // <-- atribuindo requisicao ao produto/objeto
    if (!id || !nome || !preco) {                // <-- "se nao tiver ... ou "
      return resposta.status(200).json({mensagem: "Todos os dados devem ser preenchidos!"})
    };
    const novoProduto = { id, nome, preco };     // <-- dados para o novo produto
    bancoDados.push(novoProduto);                // <-- colocando o novo produto no banco
    resposta.status(201).json({mensagem: "Produto criado com sucesso" });
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao cadastrar produtos", erro: error.message});
  };
});

/* editar o produto do servidor */
app.put('/produtos/:id', (requisicao, resposta) => {
  try {
    // localhost:3000/produtos/1
    const id = requisicao.params.id;  // <-- buscando o parametro id
    const {novoNome, novoPreco} = requisicao.body;  // <-- o que alterar no corpo da requisicao
    if (!id) {
      return resposta.status(404).json({mensagem: "Informe um parametro"})  // <-- mensagem de retorno se o id nao for informado
    };
    const produto = bancoDados.find(elemento => elemento.id === id); // <-- verificar se o produto está no banco
    if (!produto) {
      return resposta.status(404).json({mensagem: "Produto não encontrado"}) // <-- mensagem de retorno o produto não estiver
    };
    if (produto) {
      produto.nome = novoNome || produto.nome   // <-- recebendo novo nome ou permanecendo o mesmo nome
      produto.preco = novoPreco || produto.preco // <-- recebendo novo preço ou permanecendo o mesmo preco
    };
    resposta.status(200).json({mensagem: "Produto atualizado com sucesso!"});
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao cadastrar produtos", erro: error.message});
  };
});

/* deletar produto do sistema */
app.delete('/produtos/:id', (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const index = bancoDados.findIndex(elemento => elemento.id === id); // <-- procurando id pela posicao
    if (index === -1) {  // <-- se nao encontrar (-1) no index
      return resposta.status(404).json({mensagem: "Produto não encontrado"})
    };
    bancoDados.splice(index, 1);  // <-- deletar 1 quantidade do total de produtos do index
    resposta.status(200).json({mensagem: "Produto deletado com sucesso!"});
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao excluir produto", erro: error.message})
  };
})

app.delete('/produtos', (requisicao, resposta) => {
  try {
    bancoDados.length = 0;
    resposta.status(200).json({mensagem: "Todos os produtos foram excluídos."});
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao excluir todos os produtos", erro: error.message});
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
