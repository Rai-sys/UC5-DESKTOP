const ProfessorModel = require('../models/index');

class ProfessorController {
    static async criar(requisicao, resposta) {
        try {
            const { id, nome, turma, disciplina } = requisicao.body
            if (!id || !nome || !turma || !disciplina) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos!" })
            }
            const novoProfessor = await ProfessorModel.criar(id, nome, turma, disciplina)
            resposta.status(200).json({ novoProfessor })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao cadastrar profesor.", erro: error.message })
        }
    }

    static async listar(requisicao, resposta) {
        try {
            const professores = await ProfessorModel.listar()
            if (professores.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhum professor cadastrado." })
            }
            resposta.status(200).json({ mensagem: "Lista de todos os professores!" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar os professores.", erro: error.message })
        }
    }

    static async listarPorID(requisicao, resposta) {
        try {
            const id = requisicao.params.id
            const professor = await ProfessorModel.listarPorID(id)
            if (!professor) {
                return resposta.status(400).json({ mensagem: "Nenhum professor encontrado.", erro: error.message })
            }
            resposta.status(400).json(professor)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar o professor selecionado", erro: error.message })
        }
    }

    static async editar(requisicao, resposta) {
        try {
            
        } catch (error) {
            
        }
    }

    static async excluir(requisicao, resposta) {
        try {
            
        } catch (error) {
            
        }
    }
    
    static async excluirPorID(requisicao, resposta) {
        try {
            
        } catch (error) {
            
        }
    }
}