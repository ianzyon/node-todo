// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID} = require('mongodb');

var Obj = new ObjectID();
console.log(Obj);
// leva dois argumentos 1 url ou localhost onde o database vive  2 callback que 
//                   sintaxe       url ou porta/Nome do banco
MongoClient.connect('mongodb://localhost:27017/TodoApp', 
(err, db) => { // recebe um parametro de erro e um db 
    if (err) {
       return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    

    // db.close(); // this closes the connection with mongodb server**/
});

