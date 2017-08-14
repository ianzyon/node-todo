var bodyParser = require('body-parser');
var express = require('express');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
//midleware
app.use(bodyParser.json()); //retorna uma função por isso é aceito pelo middleware

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

app.listen(3000, 
()=> {
    console.log('Started on port 3000');
}
);
