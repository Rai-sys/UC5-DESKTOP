const sequelize = require("../../../config/configDb");
const { DataTypes } = require('sequelize');

const TurmaModel = new sequelize('TurmaModel',
  {
    cod_turma: {
      type: DataTypes.INTEGER(9),
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: { 
          msg: 'O código do curso deve conter apenas números.'
        },
        len: {
            args: [9],
            msg: "O código da turma deve ter 9 números."
        }
      }
    },
    cod_curso: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        validate: {
            isNumeric: { 
              msg: 'O código do curso deve conter apenas números.'
            },
            len: {
                args: [4],
                msg: "O código do curso deve ter 4 números."
            },
        },
        references: {
            model: 'curso',
            key: 'cod_curso'
        }
    },

    turno: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isIn: {
            args: [['matutino', 'vespertino', 'noturno']],
            msg: 'Turno inválido.'
        }
      }
    }
  },
  {
    tableName:'Turma',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  },
);

module.exports = TurmaModel;