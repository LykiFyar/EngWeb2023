var axios = require('axios')

// Task List
module.exports.taskList = () => {
    return axios.get("http://localhost:3000/tasks")
            .then(res => {
                return res.data
            })
            .catch(error => {
                return error
            })
}

module.exports.getTask = idTask => {
    return axios.get("http://localhost:3000/tasks/" + idTask)
            .then(res => {
                return res.data
            })
            .catch(error => {
                return error
            })
}

module.exports.updateTask = (task,idTask) => {
    return axios.put("http://localhost:3000/tasks/" + idTask, task)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                return error
            })
}

module.exports.deleteTask = idTask => {
    return axios.delete("http://localhost:3000/tasks/" + idTask)
            .then(res => {
                console.log("Delete id:" + idTask + " :: " + res.status);
            })
            .catch(error => {
                return error
            })
}

module.exports.addTask = task => {
    return axios.post("http://localhost:3000/tasks", task)
            .then(res => {
                console.log("Registry added: " + res.data)
                return res.data
            })
            .catch(error => {
                return error
            })
}


module.exports.editTask = (idTask,task) => {
    return axios.put("http://localhost:3000/tasks/" + idTask, task)
            .then(res => {
                console.log("Registry edited: " + res.data)
                return res.data
            })
            .catch(error => {
                return error
            })
}