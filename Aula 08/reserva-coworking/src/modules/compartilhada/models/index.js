const { pool } = require('../../../config/database');

class CompartilhadaModule {
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

    static async listarTodasComp() {

    }

    static async listarCompPorID() {

    }

    static async deletarTodasComp() {

    }

    static async deletarCompPorID() {

    }
}