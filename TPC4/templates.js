
exports.generatePage = function(list, idTask, d) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Task Manager</h1>
                </header>

                <!--Create task-->
                <div class="w3-container">
                    <form class="w3-container" method="POST">
                        <fieldset display="none">
                            <legend>Create task</legend>
                            <label>ID</label>
                            <input class="w3-input w3-round" type="text" name="id"/>
                            <label>Task</label>
                            <input class="w3-input w3-round" type="text" name="name"/>
                            <label>Agent</label>
                            <input class="w3-input w3-round" type="text" name="description"/>
                            <label>Due Date</label>
                            <input class="w3-input w3-round" type="date" name="duedate"/>
                        </fieldset> 
                        <br/>
                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                    </form>
                </div>
                <!--View task-->
                <div class="w3-container">
                    `
    
    task = list.find(x => x.id == idTask)
    if(task != undefined) {
        pagHTML += `
        
        ` 
    }
    else if(idTask != "") {
        pagHTML += `
        <p align="center">.task not found</p>
        `
    }


               pagHTML += `
                </div>
                <!--List tasks-->
                <div class="w3-container">
                    <div class="w3-row">
                        <div class="w3-col s6">
                            <h3 class="w3-center">tasks .todo</h3>
                            <table class="w3-table-all">
                                <tr>
                                    <th>Task</th><th>Agent</th><th>Due Date</th><th>Ações</th>
                                </tr>
                        `
    for(let i = 0; i < list.length; i++) {
        if (list[i].is_done != 1) {
            pagHTML += `
                                <tr>
                                    <td><a  href="/">${list[i].what}</a></td>
                                    <td>${list[i].who}</td>
                                    <td>${list[i].duedate}</td>
                                    <td>[<a href="/tasks/edit/${list[i].id}">Edit</a>][<a href="/tasks/done/${list[i].id}">Done</a>]</td>
                                </tr>
        `}
    }
    pagHTML += `
                            </table>
                        </div>
                        <div class="w3-col s6 ">
                            <h3 class="w3-center">tasks .done</h3>
                            <table class="w3-table-all">
                                <tr>
                                    <th>Task</th><th>Agent</th><th>Ações</th>
                                </tr>
                        `
    for(let i = 0; i < list.length; i++) {
        if (list[i].is_done == 1) {
            pagHTML += `
            <tr>
                <td><a  href="/">${list[i].what}</a></td>
                <td>${list[i].who}</td>
                <td>[<a href="/tasks/edit/${list[i].id}">Edit</a>][<a href="/tasks/undone/${list[i].id}">Undone</a>]</td>
            </tr>
        `}
    }                
    pagHTML += `
                            </table>
                        </div>
                    </div>
                </div>
                <footer class="w3-container w3-blue">
                    <h5 align="center">Made by <a href="http://www.github.com/LykiFyar">LykiFyar</a> - Generated for EngWeb2023 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}