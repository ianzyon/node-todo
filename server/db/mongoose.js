var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // usa o Promise do ES6
// mlab mongodb_uri: mongodb://heroku_8b961v2h:tabsjsbdabqe133biaceb6p806@ds131742.mlab.com:31742/heroku_8b961v2h
// 
mongoose.connect( 'mongodb://heroku_8b961v2h:tabsjsbdabqe133biaceb6p806@ds131742.mlab.com:31742/heroku_8b961v2h' || 'mongodb://localhost:27017/TodoApp', 
{
    useMongoClient: true
});

// https://secret-hamlet-21533.herokuapp.com/
module.exports = {mongoose};