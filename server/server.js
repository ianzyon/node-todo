var bodyParser = require('body-parser');
var express = require('express');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
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
})

app.listen(3000, 
()=> {
    console.log('Started on port 3000');
}
);

module.exports = {
    app
};