const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
// encontrando pelas credenciais, login
UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user)=>{
        if (!user){
            return Promise.reject();
        }

        return new Promise((resolve, reject)=>{
            bcrypt.compare(password, user.password, (err,res)=>{
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    })
};

// encontrando pelo token
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
// deslogando, deletando tokens

UserSchema.methods.removeToken = function (token) {
    var user = this;
    
    return user.update({
        $pull: {
            tokens: {token}
        }
    }

    )
}
UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt)=> { 
            bcrypt.hash(user.password, salt, (err, hash)=> {   
                user.password = hash; 
                next();   
            });
        });
       
    } else {
        next();
    }
});

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