const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDb');   // conexão com o banco

const Aluno = sequelize.define(
  'Aluno',
  {
    matricula: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      primaryKey: true
    },

    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Forneça um e-mail válido!'
            },
            len: {
                args: [10,60],
                msg: 'O e-mail deve ter no mínimo 10 caracteres e no máximo 60 caracteres!'
            }
        }
    },

    senha: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        validate: {
            len: {
                args: [10], // tanto minino quanto maximo
                msg: 'A senha deve ter 10 caracteres!'
            }
        }
    },
    turma_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: 
    }
  },
  {
    tableName: 'aluno',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  },
);
