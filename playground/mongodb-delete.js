    const {MongoClient, ObjectID} = require('mongodb');

        MongoClient.connect('mongodb://localhost:27017/TodoApp', 
        (err, db) => { // recebe um parametro de erro e um db 
        if (err) {
        return console.log('Unable to connect to MongoDB server.');
        }
        console.log('Connected to MongoDB server.');

        //deleteMany 
        /*db.collection('Todos').deleteMany({ text: "eat lunch"}).then((result)=>{
            console.log(result);
        })*/

        //deleteOne
        /*db.collection('Todos').deleteOne({ text: "eat lunch"}).then((result)=> {
            console.log(result);
        });*/
        // findOneAndDelete  
        /*db.collection('Todos').findOneAndDelete({completed:false}).then((result) =>{
            console.log(result);
        });*/

        db.collection("Users").deleteMany({name:"Ian Zyon"}).then(
            (result) => { console.log(result.result);}
        );
        db.collection("Users").findOneAndDelete({ _id: ObjectID("59892b88b0637f839bdaef3e")}).then(
            (result) => {
                console.log(result);
            }
        );


              
    });