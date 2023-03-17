var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var server = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET / --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tasks")){
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            // Render page with the tasks list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.generatePage(tasks, "", d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage("Não foi possível obter a lista de tasks... Erro: " + erro, d))
                            res.end()
                        })
                }
                // GET /tasks/done/:id --------------------------------------------------------------------
                else if(/\/tasks\/done\/[^\/]+$/.test(req.url)){
                    var idTask = req.url.split("/")[3] // "/alunos/edit/A4140" -> ['','alunos','edit','A4140']
                    // get aluno record
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( resp => {
                            var task = resp.data
                            task.is_done = true
                            axios.put('http://localhost:3000/tasks/' + task.id,task)
                                .then(resp => {
                                    console.log(resp.data);
                                    axios.get("http://localhost:3000/tasks")
                                        .then(response => {
                                            var tasks = response.data
                                            // Render page with the tasks list
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.generatePage(tasks, "", d))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.errorPage("Não foi possível obter a lista de tasks... Erro: " + erro, d))
                                            res.end()
                                        })
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    // página de erro
                                    res.end(templates.errorPage("Unable to update record...", d))
                                });
                        })
                        .catch(erro => {
                            console.log("Erro: " + erro)
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to collect record: " + idTask, d))
                        })
                }
                // GET /tasks/undone/:id --------------------------------------------------------------------
                else if(/\/tasks\/undone\/[^\/]+$/.test(req.url)){
                    var idTask = req.url.split("/")[3] // "/alunos/edit/A4140" -> ['','alunos','edit','A4140']
                    // get task record
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( resp => {
                            var task = resp.data
                            delete task.is_done
                            axios.put('http://localhost:3000/tasks/' + task.id,task)
                                .then(resp => {
                                    console.log(resp.data);
                                    axios.get("http://localhost:3000/tasks")
                                        .then(response => {
                                            var tasks = response.data
                                            // Render page with the tasks list
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.generatePage(tasks, "", d))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.errorPage("Não foi possível obter a lista de tasks... Erro: " + erro, d))
                                            res.end()
                                        })
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    // página de erro
                                    res.end(templates.errorPage("Unable to update record...", d))
                                });
                        })
                        .catch(erro => {
                            console.log("Erro: " + erro)
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to collect record: " + idTask, d))
                        })
                }
                else if(/\/tasks\/edit\/[^\/]+$/.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    // get aluno record
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            // Render page with the tasks list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.generatePage(tasks, "", d, idTask))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage("Não foi possível obter a lista de tasks... Erro: " + erro, d))
                            res.end()
                        })
                }
                // GET /tasks/delete/:id --------------------------------------------------------------------
                else if(/\/tasks\/delete\/[^\/]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3] // "/tasks/edit/A4140" -> ['','tasks','edit','A4140']
                    axios.delete('http://localhost:3000/tasks/' + idTask)
                        .then(resp => {
                            console.log("Delete" + idTask + " :: " + resp.status);
                            axios.get("http://localhost:3000/tasks")
                                .then(response => {
                                    var tasks = response.data
                                    // Render page with the tasks list
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.generatePage(tasks, 'Registo apagado:' + idTask, d))
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Não foi possível obter a lista de tasks... Erro: " + erro, d))
                                })
                        }).catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to delete record: " + idTask, d))
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/' || req.url == '/tasks'){
                    collectRequestBodyData(req,result => {
                        if (result) {
                            axios.post('http://localhost:3000/tasks',result)
                                .then(resp => {
                                    console.log(resp.data);
                                    axios.get("http://localhost:3000/tasks")
                                        .then(response => {
                                            var tasks = response.data
                                            // Render page with the tasks list
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.generatePage(tasks, 'Registo inserido:' + JSON.stringify(resp.data), d))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                                            res.end()
                                        })
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    // página de erro
                                    res.end('<p>Unable to insert record...</p>')
                                });
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                    
                }
                else if(/\/tasks\/edit\/[^\/]+$/.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result) {
                            console.dir(result)
                            axios.put('http://localhost:3000/tasks/' + result.id,result)
                                .then(resp => {
                                    console.log(resp.data);
                                    idTask = resp.data.id
                                    axios.get("http://localhost:3000/tasks")
                                        .then(response => {
                                            var tasks = response.data
                                            console.log("fiz qualquer coisa")
                                            // Render page with the tasks list
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.generatePage(tasks, 'Registo alterado:' + JSON.stringify(resp.data), d))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                                            res.end()
                                        })
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    // página de erro
                                    res.end(templates.errorPage("Unable to update record...", d))
                                });
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

server.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
