const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
var {authenticate} = require('./middleware/auth');
// endereço do api // https://secret-hamlet-21533.herokuapp.com/

var app = express();
// enverioment port variable
const port = process.env.PORT || 3000;

//midleware
app.use(bodyParser.json()); //retorna uma função por isso é aceito pelo middleware

// rota para 'todos' que inclui dados no banco de dados com um POST request  
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

app.get('/todos', authenticate,
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
app.get('/todos/:id', authenticate,
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

// rota para deleção
app.delete('/todos/:id', authenticate,
(req, res) => {
    let id = req.params.id; // propriedade id da requisicao http
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ error: "INVALID_ID"});
        console.log('error invalid id');
    }
    Todo.findByIdAndRemove(id).then(
        (todoD) => {
            if (!todoD) {
                return res.send({ error: "NOT_FOUND"});
                console.log('error not found');
            }
            res.send({todoD});
            console.log(todoD);
        },
        (e) => { res.status(400).send(e)}
    ); 
});
// update db
app.patch('/todos/:id', authenticate,
(req,res)=> {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']); //verifica e recupera as propriedades especificadas no array
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ error: "INVALID_ID"});
        console.log('error invalid id');
    }
    // se for completado troca o completed para true
    if(_.isBoolean(body.completed)&& body.completed) {
        body.completedAt = Date();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(
            // identificador
            id, // update operator 
            {
                $set: body
            }, // opcionais 
            {
                new: true
            }
        ).then(
            (todo) => {
                if (!todo) {
                    return res.status(404).send({ error: "NOT_FOUND"});
                }

                res.send({todo});
            }, (e) => {
                console.log('Error');
                res.status(400).send({e});
            }
        );
});
// rota para post user
app.post('/user', authenticate, 
    (req, res) => { //request, result
        var body = _.pick(req.body, ['name','password', 'email','age','city']) 
        var user = new User(body);

        user.save().then(
            (doc) => {
                return user.generateAuthToken();
            }
        )
        .then((token) => {
            res.header('x-auth', token).send(user);
        }
        )
        .catch((e) => {
                res.status(400).send(e);
                }
        );

    }
);
// get all user
app.get('/user', authenticate,
(req, res)=>{
    
    User.find().then(
        (users) => {   
            res.send({users});
        }, // success promise
        (e) => {
            res.status(400).send(e);
        } // rejectd promise
    )
});

// autenticação private route
app.get('/user/me', authenticate,
(req, res)=>{
   res.send(req.user);
});
// post /user/login {email, password}
app.post('/user/login',
    (req, res) => {
        var body = _.pick(req.body, ['email', 'password']);

        User.findByCredentials(body.email,body.password).then(
            (user)=>{
                user.generateAuthToken().then((token)=>{
                    res.header('x-auth', token).send(user);
                });
            }
        ).catch((e)=>{ res.status(400).send({error: "WRONG_PASSWORD"})});
    }   
);
// loggout delete route

app.delete('/user/me/token', authenticate, (req,res)=>{
    
    try {
        req.user.removeToken(req.token).then((user)=>{
            res.status(200).send(user);
        }, (e)=>{ res.status(400).send(e);
        });
    } catch(err) {
        console.log("USER_NULL");
    }
    
    
});


app.listen(port, 
()=> {
    console.log(`Started on port ${port}`);
}
);

module.exports = {
    app
};