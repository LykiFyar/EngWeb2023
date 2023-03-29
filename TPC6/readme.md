# TPC6

This week's Work Assignement has the following tasks:

* Get back to the [persons dataset](dataset-extra1.json) and analyse it;
* Create a REST API able to perform CRUD operations on it, and consider that the information will be stored in MongoDB;
* Create a program in a language of your choice that reads tha dataset file and makes requests to your API to load all records on MongoDB;

As an extra, add the following operations to your API:

GET /treinos/modalidades
    - It should return a JSON string with a list of all modalidades, without duplicates and in alphabetical order;  
GET /treinos/duracao  
    - It should return a number matching the total added duration of all records;  
GET /treinos/atletas  
    - It should return a JSON string with a list of all athlete names, without duplicates and in alphabetical order.  