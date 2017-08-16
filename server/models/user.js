const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required:true
        }
    }],
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
        minlength: 5,
        trim: true,
        unique: true,
        required: [true, 'User email required'],
        validate: {
            isAsync: true,
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
        }
    }
});
// criando métodos
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick( userObject, ['_id', 'name', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({
        access,
        token
    });

    return user.save().then(()=>{
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth' 
    });
}; 

var User = mongoose.model('User', UserSchema );
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