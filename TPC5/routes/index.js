var express = require('express');
var router = express.Router();
var Task = require('../controllers/task');

/* GET home page. */
router.get('/' || 'tasks', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.taskList()
    .then(tasks => {
      res.render('index', {list: tasks, d: data});
    }) 
    .catch(erro => {
      res.render('error', {d: data, msg: "Erro na obtenção da lista de tarefas"})
    })
});

router.get('/tasks/edit/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.taskList()
    .then(tasks => {
      res.render('index', {list: tasks, d: data, idTask: req.params.idTask});
    }) 
    .catch(erro => {
      res.render('error', {d: data, msg: "Erro na obtenção da lista de tarefas"})
    })
});

router.get('/tasks/done/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.getTask(req.params.idTask)
  .then(task => {
    task.is_done = true 
    Task.updateTask(task, req.params.idTask)
      .then(resp => {
        Task.taskList()
          .then(tasks => {
            res.render('index', {list: tasks, d: data});
          }) 
          .catch(erro => {
            res.render('error', {d: data, msg: "Erro na obtenção da lista de tarefas"})
          })
      })
      .catch(erro => {
        res.render('error', {d: data, msg: "Erro a atualizar tarefa com id: " + req.params.idTask})
      })
  })
  .catch(erro => {
    res.render('error', {d: data, msg: "Erro a obter tarefa com id: " + req.params.idTask})
  })
});


router.get('/tasks/undone/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.getTask(req.params.idTask)
  .then(task => {
    delete task.is_done 
    Task.updateTask(task, req.params.idTask)
      .then(resp => {
        Task.taskList()
          .then(tasks => {
            res.render('index', {list: tasks, d: data});
          }) 
          .catch(erro => {
            res.render('error', {d: data, msg: "Erro na obtenção da lista de tarefas"})
          })
      })
      .catch(erro => {
        res.render('error', {d: data, msg: "Erro a atualizar tarefa com id: " + req.params.idTask})
      })
  })
  .catch(erro => {
    res.render('error', {d: data, msg: "Erro a obter tarefa com id: " + req.params.idTask})
  })
});

router.get('/tasks/delete/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.deleteTask(req.params.idTask)
    .then(resp => {
      Task.taskList()
        .then(tasks => {
          res.render('index', {list: tasks, msg: 'Registo apagado:' + req.params.idTask, d: data});
        }) 
        .catch(erro => {
          res.render('error', {d: data, msg: "Erro na obtenção da lista de tarefas"})
        })
    })
    .catch(erro => {
      res.render('error', {d: data, msg: "Erro a apagar tarefa com id: " + req.params.idTask})
    })
});


router.post('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.addTask(req.body)
    .then(resp => {
      console.log('Tarefa adicionada: ' + req.body)
      Task.taskList()
        .then(tasks => {
          res.render('index', {list: tasks, msg: 'Registo adicionado:' + JSON.stringify(req.body), d: data});
        }) 
        .catch(erro => {
          res.render('error', {d: data, msg: "Erro na obtenção da lista de tarefas"})
        })
    })
    .catch(erro => {
      res.render('error', {d: data, msg: "Erro a adicionar tarefa"})
    })
});

router.post('/tasks/edit/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  //console.log("got: " + req.body)
  Task.editTask(req.params.idTask,req.body)
    .then(resp => {
      console.log('Tarefa editada: ' + req.body)
      Task.taskList()
        .then(tasks => {
          res.render('index', {list: tasks, msg: 'Registo editado:' + JSON.stringify(req.body), d: data});
        }) 
        .catch(erro => {
          res.render('error', {d: data, msg: "Erro na obtenção da lista de tarefas"})
        })
    })
    .catch(erro => {
      res.render('error', {d: data, msg: "Erro a editar tarefa"})
    })
});





module.exports = router;
