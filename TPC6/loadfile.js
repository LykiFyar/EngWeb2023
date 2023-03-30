var axios = require('axios')

const fs = require("fs");
fs.readFile("./dataset-extra1.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const json = JSON.parse(jsonString);
    for(let i = 0; i < json.pessoas.length; i++) {
        axios.post('http://localhost:3000/tasks',json.pessoas[i])
            .then(resp => {
                console.log("Added registry with id: " + json.pessoas[i]._id)
            })
            .catch(error => {
                console.log('Erro: ' + error);
            });
    }
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});