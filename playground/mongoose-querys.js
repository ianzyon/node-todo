var {ObjectID} = require('mongodb');
var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');

var id = '599106ca41475c1be4a3ca46';


if (!ObjectID.isValid(id)) {
    console.log("ID not Valid");
}
// mongoose nao necessita do Object ID 
Todo.find({
}).then(
    (todos)=>{
        console.log('Todos', todos);
    })

/*Todo.findOne({
   _id: id 
}).then((todo)=>{
    console.log('Todo', todo);
});*/
// testa se o ID é valido


//achando diretamente pelo id
/*Todo.findById(id).then((todo)=>{
    if(!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by id', todo);
}).catch((e) => console.log(e));*/

/*User.findById(id).then((user)=>{ // quando o find disparar fazer
    if(!user) { // se nao houver retorno para o find
        return console.log("Id not found");
    }
    console.log("User ", user);
}).catch((e) => console.log(e));*/