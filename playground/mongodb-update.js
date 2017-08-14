    const {MongoClient, ObjectID} = require('mongodb');

        MongoClient.connect('mongodb://localhost:27017/TodoApp', 
        (err, db) => { // recebe um parametro de erro e um db 
        if (err) {
        return console.log('Unable to connect to MongoDB server.');
        }
        console.log('Connected to MongoDB server.');

        //findOndAndUpdate
       /* db.collection("Todos").findOneAndUpdate({
            _id: new ObjectID("598bc91d0a239699935dd349")
        },
        {
            $set: {
                completed: true
            }
        }, {

            returnOriginal: false
        }).then(
            (result) => {
                console.log(result);
            }
        );*/

        db.collection("Users").findOneAndUpdate(
            // identificador
            {
                _id: new ObjectID("5989307c1a84d00c28b61197")
            }, // update operator 
            {
                $set: {
                    name: "Ian Zyon"
                },
                $inc: {
                    age: +1
                }
            }, // opcionais 
            {
                returnOriginal: false
            }
        ).then(
            (result) =>
            {
                console.log(result);
            }
        );
      
              
    });