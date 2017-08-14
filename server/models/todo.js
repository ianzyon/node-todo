var mongoose = require('mongoose');


var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: String,
        default: null
    }
});
/*var date = Date();
var newTodo = new Todo({
    text: " Edit the video",
    completed: false,
    completedAt: date
});
newTodo.save().then(
    (doc) => {
        console.log('Save todo: ',doc);
    }, (e) => {
        console.log("Unable to save todo");
    } 
);
*/
module.exports = {
    Todo
};