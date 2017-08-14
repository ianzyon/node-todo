var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    age: {
        type: Number,
        default: 1
    },
    city: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});
/*
var nUser = new User({
    name: "Carlos",
    age: 28,
    city: "Belem",
    email: "  carlos@meuemail.com.br"
});
// função salvar
nUser.save().then(
    (doc) => {
        console.log('Saved User: ',doc);
    }, (e) => {
        console.log("Unable to save user");
    } 
);
*/
module.exports = {
    User
};