const { where } = require('sequelize');
const CursoModel = require('../../curso/model/curso.model');

class CursoController {
    static async criarCurso(req, res) {
        try {
            const {cod_curso, nome, descricao} = req.body;
            if (!cod_curso || !nome || !descricao) {
                return res.status(401).json({ msg: 'Todos os campos devem serem preenchidos!' })
            }
            const cursoCriado = await CursoModel.create({ cod_curso, nome, descricao });
            res.status(201).json(cursoCriado);
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor, tente mais tarde!' });
        }
    };

    static async listarCurso(req, res) {
        try {
            const cursos = await CursoModel.findAll();
            if (cursos.length === 0) {
                return res.status(200).json({ msg: "Não há cursos a serem exibidos!" })
            };
            res.status(200).json(cursos);
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor, tente mais tarde!' });
        }
    };

    static async listarCursoPorCOD(req, res) {
        try {
            const cod = req.params.cod_curso;
            const curso = await CursoModel.findByPk({cod});
            if (!curso) {
                return res.status(404).json({ msg: "Curso não encontrado" })
            }
            res.status(200).json({curso});
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor, tente mais tarde!' })
        }
    };

    static async editarCurso(req, res) {
        try {
            const cod = req.params.cod_curso;
            const { nome, descricao } = req.body;
            if (!nome || !descricao) {
                return res.status(401).json({ msg: "Os campos nome e descrição devem ser preenchidos." });
            };
            const cursoAtualizado = await CursoModel.update(
                {nome: nome, descricao: descricao},
                {where: {cod_curso: cod}}
            );
            if(cursoAtualizado.length === 0) {
                return res.status(404).json({ msg: "Curso não encontrado." })
            };
            res.status(200).json(cursoAtualizado);
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor, tente mais tarde!' })
        }
    };

        static async deletarCursoPorCOD(req, res) {
            try {
                const cod = req.params.cod_curso;
                const curso = await CursoModel.findByPk(cod_curso);
                if(!curso) {
                    return res.status(404).json({ msg: "Curso não encontrado!" })
                }
                await CursoModel.destroy({
                    where: {
                        cod_curso: cod
                    }
                });
                res.status(200).json({ msg: "Aluno excluído com sucesso!" });
            } catch (error) {
                res.status(500).json({ msg: 'Erro interno do servidor. Por favor, tente mais tarde!' });
            }
        }
    // static async deletarCurso(req, res) {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }
};

module.exports = CursoController;