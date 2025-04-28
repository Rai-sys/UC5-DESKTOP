const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

const SecretarioModel = sequelize.define('SecretarioModel',
    {
      // Atributos do model
      matricula: {
        type: DataTypes.CHAR(5),
        primaryKey: true,
        validate: {
            is: {
                args: /^[a-zA-Z]\d{4}$/,
                msg: 'A matrícula deve começar com uma letra e ter quatro números em seguir.'
            }
        }
      },

      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isAlpha: {
                msg: 'É permitido apenas letras.'
            }
        }
      },

      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false, // Caso erro, é aqui
        validate: {
            isEmail: {
                args: /^[a-zA-Z0-9._%+-]+@rn\.senac\.br$/,
                msg: 'E-mail inválido! O e-mail deve pertencer ao dominio @rn.senac.br.'
            }
        }
      },

      senha: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            len: {
                args: [8, 12],
                msg: 'A senha deve ter no mínimo 8 caracteres e no máximo 12 caracteres.'
            },
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                msg: 'Pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial (como ! @ # $ % ^ & * ())'
            }
        }
      }
    },
    {
        tableName: 'Secretario',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    }
  );

module.exports = SecretarioModel;