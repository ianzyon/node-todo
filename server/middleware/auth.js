var {User} = require('../models/user');


var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then(
        (user) => {
            if (!user) {
               res.status(400).send({error: 'NOT_FOUND'});
            }

            req.user = user;
            req.token = token;
            next();
        }
    ).catch((e)=> { 
        res.status(401).send({error: 'AUTHENTICATION_NEEDED'});
    });
};

module.exports = {
    authenticate
};