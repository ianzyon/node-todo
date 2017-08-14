// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// leva dois argumentos 1 url ou localhost onde o database vive  2 callback que 
//                   sintaxe       url ou porta/Nome do banco
MongoClient.connect('mongodb://localhost:27017/TodoApp', 
(err, db) => { // recebe um parametro de erro e um db 
    if (err) {
       return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');
    
   /* db.collection('Todos').find({_id: new ObjectID('59892799d78a0f14d46b0e7c')}).toArray().then( 
        (docs) => {
            console.log('To dos');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('unable to fetch todos', err);
        }
    );*/
    db.collection('Users').find({ name: 'Ian'}).toArray().then( 
        (counts) => {
            console.log(`users: ${JSON.stringify(counts, undefined,2)}`);
        }, (err) => {
            console.log('unable to fetch todos', err);
        }
    );
    
});
