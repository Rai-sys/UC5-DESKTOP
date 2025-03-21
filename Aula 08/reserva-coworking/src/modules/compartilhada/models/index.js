const { pool } = require('../../../config/database');

class CompartilhadaModel {
    static async criar(id, usuario, sala, dataHoraInicio, dataHoraFinal) {
        const dados = [id, usuario, sala, dataHoraInicio, dataHoraFinal]
        const consulta = `insert into compartilhada(id, usuario, sala, data_hora_inicio, data_hora_final ) values($1, $2, $3, $4, $5) returning *`
        const novaConsultaComp = await pool.query(consulta, dados)
        return novaConsultaComp.rows
    }

    static async editar(id, usuario, sala, dataHoraInicio, dataHoraFinal) {
        const dados = [id, usuario, sala, dataHoraInicio, dataHoraFinal]
        const consulta = `update compartilhada set usuario = $2, sala = $3, data_hora_inicio = $4, data_hora_final = $5 where id = $1 returning *`
        const compartilhadaAtt = await pool.query(consulta, dados)
        return compartilhadaAtt.rows
    }

    static async listarTodas() {
        const consulta = `select * from aluno`
        const compartilhadas = await pool.query(consulta)
        return compartilhadas.rows
    }

    static async listarPorID(id) {
        const dados = [id]
        const consulta = `select * from compartilhada where id = $1`
        const compartilhada = await pool.query(consulta, dados)
        return compartilhada.rows
    }

    static async deletarTodas() {
        const consulta = `delete from compartilhada returning *`
        await pool.query(consulta)
    }

    static async deletarPorID(id) {
        const dados = [id]
        const consulta = `delete from compartilhada where id = $1 returning *`
        await pool.query(consulta, dados)
    }
}

module.exports = CompartilhadaModel;