// mypages.js
// 2023-03-03
// HTML templates generating functions

exports.genMainPage = function(list, date) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Pessoas</h1>
                    <a class="w3-btn w3-round" href="/pessoas/sexo">Distribuição por sexo</a>
                    <a class="w3-btn w3-round" href="/pessoas/desporto">Distribuição por desporto</a>
                    <a class="w3-btn w3-round" href="/pessoas/profissoes">Top 10 Profissões</a>
                </header>
            
            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>
            
            
                
                `
    for (let i = 0; i < list.length; i++) {
        pagHTML += `
        <tr>
            <td>${list[i].id}</td>
            <td>
                <a href="/pessoas/${list[i].id}">${list[i].nome}</a>
            </td>
            <td>${list[i].idade}</td>
            <td>${list[i].sexo}</td>
            <td>${list[i].morada.cidade}</td>
        </tr>
        `
    }


    pagHTML += `
                        </table>
                    </div>
                    <footer class="w3-container w3-blue">
                        <h5>Generated in EngWeb2023 ${date}</h5>
                    </footer>
                </div>
            </body>
        </html>
        `
    
    return pagHTML
}

exports.genPersonPage = function(p,d) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>${p.nome}</h1>
                    <a class="w3-btn w3-round w3-white" href="/">Página Inicial</a>
                </header>
                <div class "w3-container">
                    <ul class="w3-ul w3-card-4">
                        <li><b>Idade: </b>${p.idade}</li>
                        <li><b>Sexo: </b>${p.sexo}</li>
                        <li><b>Cidade: </b>${p.morada.cidade}</li>
                        <li><b>Distrito: </b>${p.morada.distrito}</li>
                        <li><b>BI/CC: </b>${p.BI || p.CC}</li>
                        <li><b>Profissão: </b>${p.profissao}</li>
                        <li><b>Desportos: </b>z
                            <ul class="w3-ul w3-card-4">
                        `
        for(sport of p.desportos) {
            pagHTML += "<li><b>" + sport + "</li>"
        }

        pagHTML += 
                        `       </ul>
                            </li>
                        <li><b>More info to add..</b></li>
                    </ul>
                </div>
                <footer class="w3-container w3-blue">
                        <h5>Generated in EngWeb2023 ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
        `
    
    return pagHTML
}

exports.genSexDistPage = function(pessoas, date) {
    var dict_sexos = {}
    for(let i = 0; i < pessoas.length; i++){
        if (pessoas[i].sexo in dict_sexos){
            dict_sexos[pessoas[i].sexo] += 1
        }
        else {
            dict_sexos[pessoas[i].sexo] = 1
        }
    }



    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Distribuição por sexo</h1>
                    <a class="w3-btn w3-round w3-white" href="/">Página Inicial</a>
                    <a class="w3-btn w3-round" href="/pessoas/sexo">Distribuição por sexo</a>
                    <a class="w3-btn w3-round" href="/pessoas/desporto">Distribuição por desporto</a>
                    <a class="w3-btn w3-round" href="/pessoas/profissoes">Top 10 profissões</a>
                </header>
            
            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>Sexo</th>
                        <th>Frequência</th>
                    </tr>
            
            
                
                `
    for (let sexo in dict_sexos) {
        pagHTML += `
        <tr>
            <td>${sexo}</td>
            <td>
                <a href="/pessoas/sexo/${sexo}">${dict_sexos[sexo]}</a>
            </td>
        </tr>
        `
    }


    pagHTML += `
                        </table>
                    </div>
                    <footer class="w3-container w3-blue">
                        <h5>Generated in EngWeb2023 ${date}</h5>
                    </footer>
                </div>
            </body>
        </html>
        `
    
    return pagHTML
}


exports.genSexListPage = function(list, parameter, date) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de pessoas do sexo: ${parameter}</h1>
                    <a class="w3-btn w3-round w3-white" href="/">Página Inicial</a>
                    <a class="w3-btn w3-round" href="/pessoas/sexo">Distribuição por sexo</a>
                    <a class="w3-btn w3-round" href="/pessoas/desporto">Distribuição por desporto</a>
                    <a class="w3-btn w3-round" href="/pessoas/profissoes">Top 10 profissões</a>
                </header>
            
            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>
            
            
                
                `
    for (let i = 0; i < list.length; i++) {
        pagHTML += `
        <tr>
            <td>${list[i].id}</td>
            <td>
                <a href="/pessoas/${list[i].id}">${list[i].nome}</a>
            </td>
            <td>${list[i].idade}</td>
            <td>${list[i].sexo}</td>
            <td>${list[i].morada.cidade}</td>
        </tr>
        `
    }


    pagHTML += `
                        </table>
                    </div>
                    <footer class="w3-container w3-blue">
                        <h5>Generated in EngWeb2023 ${date}</h5>
                    </footer>
                </div>
            </body>
        </html>
        `
    
    return pagHTML
}


exports.genSportDistPage = function(pessoas, date) {
    var dict_sports = {}
    for(let i = 0; i < pessoas.length; i++){
        for(sport of pessoas[i].desportos) {
            if (sport in dict_sports){
                dict_sports[sport] += 1
            }
            else {
                dict_sports[sport] = 1
            }
        }
    }



    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Distribuição por desporto</h1>
                    <a class="w3-btn w3-round w3-white" href="/">Página Inicial</a>
                    <a class="w3-btn w3-round" href="/pessoas/sexo">Distribuição por sexo</a>
                    <a class="w3-btn w3-round" href="/pessoas/desporto">Distribuição por desporto</a>
                    <a class="w3-btn w3-round" href="/pessoas/profissoes">Top 10 profissões</a>
                </header>
            
            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>Desporto</th>
                        <th>Frequência</th>
                    </tr>
            
            
                
                `
    for (let sport in dict_sports) {
        pagHTML += `
        <tr>
            <td>${sport}</td>
            <td>
                <a href="/pessoas/desporto/${sport}">${dict_sports[sport]}</a>
            </td>
        </tr>
        `
    }


    pagHTML += `
                        </table>
                    </div>
                    <footer class="w3-container w3-blue">
                        <h5>Generated in EngWeb2023 ${date}</h5>
                    </footer>
                </div>
            </body>
        </html>
        `
    
    return pagHTML
}


exports.genSportListPage = function(list, sport, date) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de pessoas que praticam o desporto: ${sport}</h1>
                    <a class="w3-btn w3-round w3-white" href="/">Página Inicial</a>
                    <a class="w3-btn w3-round" href="/pessoas/sexo">Distribuição por sexo</a>
                    <a class="w3-btn w3-round" href="/pessoas/desporto">Distribuição por desporto</a>
                    <a class="w3-btn w3-round" href="/pessoas/profissoes">Top 10 profissões</a>
                </header>
            
            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>
            
            
                
                `
    for (let i = 0; i < list.length; i++) {
        if(list[i].desportos.includes(sport)) {
            pagHTML += `
            <tr>
                <td>${list[i].id}</td>
                <td>
                    <a href="/pessoas/${list[i].id}">${list[i].nome}</a>
                </td>
                <td>${list[i].idade}</td>
                <td>${list[i].sexo}</td>
                <td>${list[i].morada.cidade}</td>
            </tr>
            `
        }
    }


    pagHTML += `
                        </table>
                    </div>
                    <footer class="w3-container w3-blue">
                        <h5>Generated in EngWeb2023 ${date}</h5>
                    </footer>
                </div>
            </body>
        </html>
        `
    
    return pagHTML
}



exports.genJobDistPage = function(pessoas, date) {
    var dict_jobs = {}
    for(let i = 0; i < pessoas.length; i++){
        if (pessoas[i].profissao in dict_jobs){
            dict_jobs[pessoas[i].profissao] += 1
        }
        else {
            dict_jobs[pessoas[i].profissao] = 1
        }
    }



    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Top 10 Profissões</h1>
                    <a class="w3-btn w3-round w3-white" href="/">Página Inicial</a>
                    <a class="w3-btn w3-round" href="/pessoas/sexo">Distribuição por sexo</a>
                    <a class="w3-btn w3-round" href="/pessoas/desporto">Distribuição por desporto</a>
                    <a class="w3-btn w3-round" href="/pessoas/profissoes">Top 10 profissões</a>
                </header>
            
            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>Profissão</th>
                        <th>Frequência</th>
                    </tr>
            
            
                
                `

    var items = Object.keys(dict_jobs).map(function(key) {
        return [key, dict_jobs[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    for (let job of items.slice(0,10)) {
        pagHTML += `
        <tr>
            <td>${job[0]}</td>
            <td>
                <a href="/pessoas/profissoes/${job[0]}">${job[1]}</a>
            </td>
        </tr>
        `
    }


    pagHTML += `
                        </table>
                    </div>
                    <footer class="w3-container w3-blue">
                        <h5>Generated in EngWeb2023 ${date}</h5>
                    </footer>
                </div>
            </body>
        </html>
        `
    
    return pagHTML
}


exports.genJobListPage = function(list, job, date) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de pessoas que tem como profissão: ${job}</h1>
                    <a class="w3-btn w3-round w3-white" href="/">Página Inicial</a>
                    <a class="w3-btn w3-round" href="/pessoas/sexo">Distribuição por sexo</a>
                    <a class="w3-btn w3-round" href="/pessoas/desporto">Distribuição por desporto</a>
                    <a class="w3-btn w3-round" href="/pessoas/profissoes">Top 10 profissões</a>
                </header>
            
            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>
            
            
                
                `
    for (let i = 0; i < list.length; i++) {
        pagHTML += `
        <tr>
            <td>${list[i].id}</td>
            <td>
                <a href="/pessoas/${list[i].id}">${list[i].nome}</a>
            </td>
            <td>${list[i].idade}</td>
            <td>${list[i].sexo}</td>
            <td>${list[i].morada.cidade}</td>
        </tr>
        `
    
    }


    pagHTML += `
                        </table>
                    </div>
                    <footer class="w3-container w3-blue">
                        <h5>Generated in EngWeb2023 ${date}</h5>
                    </footer>
                </div>
            </body>
        </html>
        `
    
    return pagHTML
}