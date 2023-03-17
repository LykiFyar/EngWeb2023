
exports.generatePage = function(list, changeMessage, d, idTask) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Task Manager</title>
        </head>
        <style>
        body, h1, h2, h3, h4, h5 {font-family: Tahoma, "Trebuchet MS", sans-serif;}
        </style>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-orange">
                    <h1>Task Manager</h1>
                </header>

                <!--Create task-->
                <div class="w3-container">
                    <form class="w3-container" method="POST">
                        <fieldset display="none">
                            <legend>Create task</legend>
                            <label>Task</label>
                            <input class="w3-input w3-round" type="text" name="what"/>
                            <label>Agent</label>
                            <input class="w3-input w3-round" type="text" name="who"/>
                            <label>Due Date</label>
                            <input class="w3-input w3-round" type="date" name="duedate"/>
                        </fieldset> 
                        <br/>
                        <button class="w3-btn w3-amber w3-mb-2" formaction="/" type="submit">Register</button>
                    </form>
                </div>
                
                `
    task = list.find(x => x.id == idTask)
    if(task) {
        pagHTML += `
                <!-- Edit -->
                <div class="w3-container">
                            <form class="w3-container w3-section" method="POST">
                                <fieldset display="none">
                                    <legend>Edit task</legend>
                                    <label>Task</label>
                                    <input class="w3-input w3-round" type="text" name="what" value="${task.what}"/>
                                    <label>Agent</label>
                                    <input class="w3-input w3-round" type="text" name="who" value="${task.who}"/>
                                    <label>Due Date</label>
                                    <input class="w3-input w3-round" type="date" name="duedate" value="${task.duedate}"/>
                                    <input type="hidden" name="id"value="${task.id}"/>
                                    <input type="hidden" name="is_done"value="${task.is_done}"/>
                                </fieldset> 
                                <br/>
                                <button class="w3-btn w3-yellow w3-mb-2" formaction="/tasks/edit/${task.id}" type="submit">Edit</button>
                            </form>
                        </div>
        `
    }
    pagHTML += '<p align="center">' + changeMessage + '</p>'
    pagHTML += `
                
                <!--List tasks-->
                <div class="w3-container">
                    <div class="w3-row">
                        <div class="w3-col s6">
                            <h3 class="w3-center"><b>tasks .todo</b></h3>
                            <table class="w3-table-all">
                                <tr>
                                    <th>Task</th><th>Agent</th><th>Due Date</th><th>Ações</th>
                                </tr>
                        `
    for(let i = 0; i < list.length; i++) {
        if (!(list[i].is_done)) {
            pagHTML += `
                                <tr>
                                    <td>${list[i].what}</td>
                                    <td>${list[i].who}</td>
                                    <td>${list[i].duedate}</td>
                                    <td><a href="/tasks/edit/${list[i].id}"><button class="w3-btn w3-yellow w3-mb-2 w3-round w3-padding-small w3-margin-right" type="button">Edit</button></a> <a href="/tasks/delete/${list[i].id}"><button class="w3-btn w3-red w3-mb-2 w3-round w3-padding-small w3-margin-right" type="button">Delete</button></a>    <a href="/tasks/done/${list[i].id}"><button class="w3-btn w3-green w3-mb-2 w3-round w3-padding-small" type="button">Done</button></a></td>
                                </tr>
        `}
    }
    pagHTML += `
                            </table>
                        </div>
                        <div class="w3-col s6 ">
                            <h3 class="w3-center"><b>tasks .done</b></h3>
                            <table class="w3-table-all">
                                <tr>
                                    <th>Task</th><th>Agent</th><th>Due Date</th><th>Ações</th>
                                </tr>
                        `
    for(let i = 0; i < list.length; i++) {
        if (list[i].is_done) {
            pagHTML += `
            <tr>
                <td>${list[i].what}</td>
                <td>${list[i].who}</td>
                <td>${list[i].duedate}</td>
                <td><a href="/tasks/edit/${list[i].id}"><button class="w3-btn w3-yellow w3-mb-2 w3-round w3-padding-small w3-margin-right" type="button">Edit</button></a> <a href="/tasks/delete/${list[i].id}"><button class="w3-btn w3-red w3-mb-2 w3-round w3-padding-small w3-margin-right" type="button">Delete</button></a> <a href="/tasks/undone/${list[i].id}"><button class="w3-btn w3-blue w3-mb-2 w3-round w3-padding-small" type="button">Undone</button></a></td>
            </tr>
        `}
    }                
    pagHTML += `
                            </table>
                        </div>
                    </div>
                </div>
                <footer class="w3-container w3-deep-orange">
                    <h5 align="center">Made by <a href="http://www.github.com/LykiFyar">LykiFyar</a> - Generated for EngWeb2023 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.errorPage = function(msg,d) {
    return `<p>${d} - Error: ${msg}</p>
    <a href="/">Back to base</a>
    `
}