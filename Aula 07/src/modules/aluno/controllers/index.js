const AlunoModel = require('../models/index'); //importanto o module do models Aluno

class AlunoController {
    static async criar(requisicao, resposta) {
        try {
            const { matricula, nome, email, senha } = requisicao.body  // passando os dados da requisicao
            if (!matricula || !nome || !email || !senha) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos!" })
            }
            const novoAluno = await AlunoModel.criar(matricula, nome, email, senha)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar aluno.", erro: error.message })
        }
    }

    static async listarTodos(requisicao, resposta) {
        try {
            const alunos = await AlunoModel.listar()
            if (alunos.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhum aluno cadastrado.", erro: error.message })
            }
            resposta.status(200).json({ mensagem: "Lista de todos os alunos!"})
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar alunos.", erro: error.message })
        }
    }

    static async listarPorID(requisicao, resposta) {
        try {
            const matricula = requisicao.params.id
            const aluno = await AlunoModel.listarPorID(matricula)
            if (!aluno) {
                return resposta.status(400).json({ mensagem: "Nenhum aluno cadastrado.", erro: error.message })
            }
            resposta.status(200).json(aluno)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar o aluno selecionado.", erro: error.message })
        }
    }
    static async editar(requisicao, resposta) {

    }
    static async excluirTodos(requisicao, resposta) {

    }
    static async excluirPorID(requisicao, resposta) {

    }
}

module.exports = AlunoController;