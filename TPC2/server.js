var http = require('http')
var url = require('url')
var fs = require('fs')


var MyServer = http.createServer(function (req, res) {
    console.log(req.method + " " + req.url)
    
    var page = "pag1.html"

    var pedido = url.parse(req.url, true).pathname
    if(pedido == "/") {
        fs.readFile("html/index.html",function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            if(err) {
                res.write("Erro: na leitura do ficheiro :: " + err)
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
    else {
        fs.readFile("html/"+ pedido.substring(1) + ".html",function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            if(err) {
                res.write("Erro: Página inexistente")
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
})

MyServer.listen(7777)
console.log("Servidor à escuta na porta 7777...")