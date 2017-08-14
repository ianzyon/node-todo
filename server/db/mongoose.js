var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // usa o Promise do ES6
mongoose.connect('mongodb://localhost:27017/TodoApp', 
{
    useMongoClient: true
});

module.exports = {mongoose};