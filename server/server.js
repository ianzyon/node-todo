var bodyParser = require('body-parser');
var express = require('express');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// endereço do api // https://secret-hamlet-21533.herokuapp.com/

var app = express();
// enverioment port variable
const port = process.env.PORT || 3000;

//midleware
app.use(bodyParser.json()); //retorna uma função por isso é aceito pelo middleware
// rota que inclui dados no banco de dados com um POST request  
app.post('/todos', 
(req, res) => { //request, result
    var todo = new Todo({
        text: req.body.text    
    });
    todo.save().then(
        (doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        } 
    );

}
);

app.get('/todos', 
(req, res)=>{
    
    Todo.find().then(
        (todos) => {      // VVV objeto contendo o vetor(sintaxe ES5, todos: todos), pode ser configurado e nao limita as propriedades de array   
            res.send({todos});
        }, // success promise
        (e) => {
            res.status(400).send(e);
        } // rejectd promise
    )
});
// get um individual todo
app.get('/todos/:id', 
(req, res)=>{
    let id = req.params.id;
    if (!ObjectID.isValid(id)) { return res.status(404).send({ error: "INVALID_ID"}); }
    Todo.findById(id).then(
    (todo)=>{
        if(!todo) {
            res.send({ error: "NOT_FOUND"});
        }
        console.log('Todo by id', todo);
        res.send({todo});
    }, (e) => {
        res.status(400).send(e);
        }
    )
});

app.listen(port, 
()=> {
    console.log(`Started on port ${port}`);
}
);

module.exports = {
    app
};