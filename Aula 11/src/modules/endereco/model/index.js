const axios = require('axios');
const { pool } = require('../../../config/database');

class EnderecoModel {
    static async criarEndereco(matricula, cep, numero, ponto_referencia) {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        // Desestruturaçao do objeto
        const { logradouro, complemento, bairro, localidade, uf } = resposta.data
        // Forma estruturada do objeto
        // const logradouro = resposta.data.logradouro
        // const complemento = resposta.data.complemento
        // const bairro = resposta.data.bairro
        // const localidade = resposta.data.localidade
        // const uf = resposta.data.uf

        // Montando o array para o query
        const dados = [
            matricula,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            localidade,
            uf,
            ponto_referencia
        ]

        const consulta = `insert into endereco(matricula, cep, logradouro, numero, complemento, bairro, localidade, uf, ponto_referencia)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`

        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEnderecos() {
        const consulta = `select * from endereco`
        const resultado = await pool.query(consulta)
        return resultado.rows
    }
    static async listarEndereco(matricula) {
        const dados = [matricula]
        const consulta = `select aluno.*, endereco.* from aluno
        join endereco on aluno.matricula = endereco.matricula
        where aluno.matricula = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEnderecoCidade(cidade) {
        const dados = [cidade]  // pegando o dado 'cidade'
        const consulta = `select * from endereco where localidade = $1`  // consulta para retornar tudo pela cidade
        const resultado = await pool.query(consulta, dados) // pegar todos os dados e consulta
        return resultado.rows  // retornar as linhas do resultado
    }
    static async listarEnderecoCEP(cep) {
        const dados = [cep]
        const consulta = `select * from endereco where cep = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async editarEndereco(matricula, cep, numero, ponto_referencia) {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const { logradouro, complemento, bairro, localidade, uf } = resposta.data

        const dados = [
            matricula,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            localidade,
            uf,
            ponto_referencia
        ]

        const consulta = `update endereco set cep = $2, logradouro = $3, numero = $4, complemento = $5,
        bairro = $6, localidade = $7, uf = $8, ponto_referencia = $9 where matricula = $1`

        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
};

module.exports = EnderecoModel;