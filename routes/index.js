var express = require('express');
var router = express.Router();
const todos = require('../data/todos')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Unit 2 Assessment', todos: todos });
});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// This is the index route to show all the todos
router.get('/', function(req, res){
    // We need to query the database to get all of the todos
    todos.find({}, function(error, todos){
        if(error){
            console.log(error)
        } else {
            console.log(todos, 'This is all the todos')
            res.render('index', {todos})
        }
    })
})

// This is the route to post a new todo to the Database

router.post('/', addItem);

function addItem(req, res, next) {
  todos.push({item: req.body.todo, done: false})
  res.redirect('/');
}

// Delete todos by it's id
router.delete('/:id', function(req, res){
    console.log(req.params.id, 'Id in the delete route')
    todos.findByIdAndRemove(req.params.id, function(error, deletedTodos){
        if(error){
            console.log(error)
        } else {
            console.log(deletedtodos, 'This todos was deleted')
            res.redirect('/')
        }
    })
})

module.exports = router
