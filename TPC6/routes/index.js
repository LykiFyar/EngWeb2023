var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')


router.get('/pessoas', function(req, res) {
  Pessoa.list()
    .then(pessoas => res.status(200).json(pessoas))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Erro na obtenção da lista de pessoas"}))
});

router.get('/pessoas/:idPessoa', function(req, res, next) {
  Pessoa.getPessoa(req.params.idPessoa)
  .then(pessoa => res.status(200).json(pessoa))
  .catch(erro => res.status(521).json({erro: erro, mensagem: "Erro na obtenção da pessoa: " + req.params.idPessoa}))
});

router.post('/pessoas', function(req, res, next) {
  Pessoa.addPessoa(req.body)
  .then(pessoa => res.status(201).json(req.body))
  .catch(erro => res.status(522).json({erro: erro, mensagem: "Erro a adicionar a pessoa"}))
});

router.put('/pessoas/:idPessoa', function(req, res, next) {
  Pessoa.updatePessoa(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(523).json({erro: erro, mensagem: "Erro a alterar pessoa"}))
});

router.delete('/pessoas/:idPessoa', function(req, res, next) {
  Pessoa.deletePessoa(req.params.idPessoa)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(524).json({erro: erro, mensagem: "Erro a apagar pessoa"}))
});

module.exports = router;
