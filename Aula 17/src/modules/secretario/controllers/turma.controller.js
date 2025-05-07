const TurmaModel = require('../../turma/model/turma.model');

class TurmaController{
    static async criarTurma(req, res) {
        try {
            const {cod_turma, cod_curso, turno} = req.body;
            if(!cod_turma || !cod_curso || !turno) {
                return res.status(400).json({ msg: "Todos os campos devem ser preenchidos." })
            }
            const turma = await TurmaModel.create({cod_turma, cod_curso, turno});
            res.status(201).json({ msg: "Turma criada com sucesso", turma: turma });
        } catch (error) {
            
        }
    }

    static async listarTodasTurmas(req, res) {
        try {
            
        } catch (error) {
            
        }
    }

    static async listarTurmaPorCOD(req, res) {

    }

    static async editarTurmaPorCOD(req, res) {

    }

    static async deletarTodasTurmas(req, res){

    }

    static async deletarTurmaPorCOD(req, res) {

    }
}

module.exports = TurmaController;