var {ObjectID} = require('mongodb');
var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');

/*Todo.remove({}).then(
    (result) => {
        console.log(result.result);
    }
);*/
// remove 1 e printa o documento removido

// Todo.findOneAndRemove({}).then()
// Todo.findByIdAndRemove
// 

Todo.findByIdAndRemove("59932af05be61821884d011f").then(
    (doc) => {
        console.log(doc);
    }
);