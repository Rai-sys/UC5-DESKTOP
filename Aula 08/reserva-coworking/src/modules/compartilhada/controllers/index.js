const CompartilhadaModel = require('../models/index')

class CompartilhadaController {
    static async criar(requisicao, resposta){
        try {
            const { id, usuario, sala, dataHoraInicio, dataHoraFinal } = requisicao.body;
            if (!id || !usuario || !sala || !dataHoraInicio || !dataHoraFinal) {
                return resposta.status(400).json({ mensagem: "Preencha todos os campos para a reserva ser finalizada."})
            }
            const novaReserva = await CompartilhadaModel.criar(id, usuario, sala, dataHoraInicio, dataHoraFinal);
            resposta.status(201).json({ mensagem: "Reserva Compartilhada criada com sucesso!", reserva: novaReserva })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar reserva Compartilhada.", erro: error.message })
            
        }
    }
    static async editar(requisicao, resposta){
        try {
            const id = requisicao.params.id
            const { usuario, sala, dataHoraInicio, dataHoraFinal } = requisicao.body
            if ( !usuario || !sala || !dataHoraInicio || !dataHoraFinal ) {
                return resposta.status(400).json({ mensagem: "Um campo deve ser preenchido no mínimo." })
            }
            const reserva = await CompartilhadaModel.editar(id, usuario, sala, dataHoraInicio, dataHoraFinal)
            if (reserva.length === 0) {
                return resposta.status(400).json({ mensagem: "Reserva não encontrada para editar." })
            }
            resposta.status(200).json({ mensagem: "Reserva editada com sucesso!", reservaEditada: reserva})
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao atualizar reserva.", erro: error.message })
        }
    }
    static async listarPorID(requisicao, resposta){
        try {
            const id = requisicao.params.id
            const reserva = await CompartilhadaModel.listarPorID(id)
            if (reserva.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhuma reserva cadastrada."})
            }
            resposta.status(200).json(reserva)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar reserva cadastrada.", erro: error.message })
        }
    }
    
    static async listarTodas(requisicao, resposta){
        try {
            const reservas = await CompartilhadaModel.listarTodas()
            if (reservas.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhuma reserva cadastrada."})
            }
            resposta.status(200).json(reservas)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar reservas compartilhadas." })
        }
    }
    static async deletarPorID(requisicao, resposta){
        try {
            const id = requisicao.params.id           // buscando matricula
            const reservas = await CompartilhadaModel.deletarPorID(id)  // verificar se o aluno existe pela matricula NA LISTA
            if (!reservas) {                                           // se não encontrar...
                return resposta.status(400).json({ mensagem: "Reserva não encontrada." })
            }
            await CompartilhadaModel.deletarPorID(id)     // apagando aluno se for encontrado
            resposta.status(200).json({ mensagem: "Reserva excluida com sucesso!" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir a reserva.", erro: error.message })
        }
    }
    static async deletarTodas(requisicao, resposta){
        try {
            await CompartilhadaModel.deletarTodas()
            resposta.status(200).json({ mensagem: "Todas as reservas foram excluidas." })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao apagar todas as reservas.", erro: error.message })
        }
    }
}

module.exports = CompartilhadaController;