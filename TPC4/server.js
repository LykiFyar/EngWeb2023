var axios = require('axios')
var http = require('http')
var templates = require('./templates')
var static = require('./static')



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
                            res.write("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /tasks/:id --------------------------------------------------------------------
                else if(/\/tasks\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[2]
                    axios.get("http://localhost:3000/tasks")
                        .then( response => {
                            var tasks = response.data
                            // Add code to render page with the task record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.generatePage(tasks,idTask, d))
                        })
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url == "/alunos/registo"){
                    // Add code to render page with the student form
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                }
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if(/\/alunos\/edit\/(A|PG)[0-9]+$/i.test(req.url)){
                    var idAluno = req.url.split("/")[3] // "/alunos/edit/A4140" -> ['','alunos','edit','A4140']
                    // get aluno record
                    axios.get("http://localhost:3000/alunos/" + idAluno)
                        .then( resp => {
                            var aluno = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.studentFormEditPage(aluno,d))
                        })
                        .catch(erro => {
                            console.log("Erro: " + erro)
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to collect record: " + idAluno, d))
                        })
                }
                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if(/\/alunos\/delete\/(A|PG)[0-9]+$/i.test(req.url)){
                    var idAluno = req.url.split("/")[3] // "/alunos/edit/A4140" -> ['','alunos','edit','A4140']
                    axios.delete('http://localhost:3000/alunos/' + idAluno)
                        .then(resp => {
                            console.log("Delete" + idAluno + " :: " + resp.status);
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            // página de confirmação
                            res.end('<p>Registo apagado:' + idAluno + ' </p>')
                        }).catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to delete record: " + idAluno, d))
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/alunos/registo'){
                    collectRequestBodyData(req,result => {
                        if (result) {
                            axios.post('http://localhost:3000/alunos',result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    // página de confirmação
                                    res.end('<p>Registo inserido:' + JSON.stringify(resp.data) + ' </p>')
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
                else if(/\/alunos\/edit\/(A|PG)[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result) {
                            console.dir(result)
                            axios.put('http://localhost:3000/alunos/' + result.id,result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    // página de confirmação
                                    res.end('<p>Registo alterado:' + JSON.stringify(resp.data) + ' </p>')
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
