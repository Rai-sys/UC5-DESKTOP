const sequelize = require("../../../config/configDb");
const { DataTypes } = require('sequelize');

const CursoModel = new sequelize('CursoModel',
  {
    cod_curso: {
      type: DataTypes.INTEGER(4),
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        is: { 
          args: /^[1-9][0-9]{3}$ /,
          msg: 'O código do curso deve conter apenas números.'
        }
      }
    },
    nome: {
      type: DataTypes.STRING(37),
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'É permitido apenas letras.'
        }
      }
    },
    descricao: {
      typeof: DataTypes.STRING(200),
      allowNull: false
    }
  },
  {
    tableName:'Curso',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  },
);

module.exports = CursoModel;