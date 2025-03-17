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
        try {
            const matricula = requisicao.params.matricula
            if (!matricula) {
                return resposta.status(400).json({ mensagem: "Aluno nao expecificado!", erro: error.message })
            }
            const aluno = await AlunoModel.editar()
            if (aluno) {
                aluno.email = novoEmail || aluno.email,
                aluno.senha = novaSenha || aluno.senhha
            }
            resposta.status(200).json({ mensagem: "Dados do aluno atualizado!" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao atualizar os dados.", erro: error.message })
        }
    }
    static async excluirTodos(requisicao, resposta) {
        try {
            const alunos = await AlunoModel.excluirTodos()
            if (alunos === 0) {
                return resposta.status(200).json({ mensagem: "Nenhum aluno registrado." })
            }
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao apagar todos os alunos.", erro: error.message })
        }
    }
    static async excluirPorID(requisicao, resposta) {
        try {
            const matricula = requisicao.params.matricula
            const aluno = await AlunoModel.excluirPorID(matricula)
            if (aluno === 0) {
                return resposta.status(200).json({ mensagem: "Aluno apagado com sucesso" })
            }
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao deleter aluno.", erro: error.message })
        }
    }
}

module.exports = AlunoController;