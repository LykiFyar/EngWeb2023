var Pessoa = require('../models/pessoa')

module.exports.list = () => {
    return Pessoa.find().sort({nome:-1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getPessoa = id => {
    return Pessoa.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addPessoa = e => {
    return Pessoa.create(e)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.updatePessoa = e => {
    return Pessoa.updateOne({_id:e._id},e)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deletePessoa = id => {
    return Pessoa.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}