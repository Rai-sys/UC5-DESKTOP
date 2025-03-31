const EnderecoModel = require('../model/index');

class EnderecoController {
    static async criarEndereco(requisicao, resposta) {
        try {
            const { matricula, cep, numero, ponto_referencia } = requisicao.body;
            if (!matricula || !cep || !numero) {
                return resposta.status(400).json({mensagem: 'Todos os campos devem ser preenchidos.'})
            };
            const endereco = await EnderecoModel.criarEndereco(matricula, cep, numero, ponto_referencia);
            resposta.status(201).json(endereco);
        } catch (error) {
            resposta.status(500).json({ mensagem: 'Erro interno no servidor. Por favor, tente mais tarde!', erro: error.message});
        }
    }

    static async editarEnderecoAluno(requisicao, resposta) {
        try {
            const matricula = requisicao.params.matricula;
            const { cep, numero, ponto_referencia } = requisicao.body;
            if (!cep || !numero) {
                return resposta.status(201).json({ mensagem: 'Pelo menos um campo deve ser preenchido'})
            };
            const endereco = await EnderecoModel.editarEndereco(matricula, cep, numero, ponto_referencia);
            if (endereco.length === 0) {
                return resposta.status(201).json({ mensagem: 'Endereço não encontrado.'})
            }
            resposta.status(200).json({ mensagem: 'Sucesso ao editar endereço!', endereco: endereco})
        } catch (error) {
            resposta.status(500).json({ mensagem: 'Erro ao editar endereço.', erro: error.message})
        }
    }

    static async listarEnderecos(requisicao, resposta) {
        try {
            const endereco = await EnderecoModel.listarEnderecos();
            if (endereco === 0) {
                return resposta.status(201).json({ mensagem: 'Erro ao listar os endereços.'})
            }
            resposta.status(200).json(endereco)
        } catch (error) {
            resposta.status(500).json({ mensagem: 'Erro ao listar endereços.', erro: error.message})
        }
    }
    
    static async listarEnderecoAluno(requisicao, resposta) {
        try {
            const matricula = requisicao.params.matricula
            const endereco = await EnderecoModel.listarEndereco(matricula)
            if (endereco === 0) {
                return resposta.status(201).json({ mensagem: 'Nenhum endereco cadastrado.'})
            }
            resposta.status(200).json(endereco)
        } catch (error) {
            resposta.status(500).json({ mensagem: 'Erro ao editar endereço.', erro: error.message})
        }

    }

    static async listarEnderecoCEP(requisicao, resposta) {
        try {
            const cep = requisicao.params.cep;
            const endereco = await EnderecoModel.listarEnderecoCEP(cep)
            if (endereco.length === 0){
                return resposta.status(400).json({ mensagem: 'CEP não existe ou está inválido.'})
            }
            resposta.status(201).json(endereco)
        } catch (error) {
            resposta.status(500).json({ mensagem: 'Erro ao listar endereço por CEP.', erro: error.message})

        }
    }

    static async listarEnderecoCidade(requisicao, resposta) {
        try {
            const cidade = requisicao.params.cidade;
            const endereco = await EnderecoModel.listarEnderecoCidade(cidade)
            if (endereco.length === 0){
                return resposta.status(400).json({ mensagem: 'Cidade não existe ou está inválido.'})
            }
            resposta.status(201).json(endereco)
        } catch (error) {
            resposta.status(500).json({ mensagem: 'Erro ao listar endereço por cidade.', erro: error.message})
        }
    }
}

module.exports = EnderecoController;