// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/TodoController');


// Add new to do
router.post('/addtodo', todoController.addToDo);

router.get('/todos', todoController.getAllTodos);




// Update a todo
// router.put('/todos/delete/:id', todoController.updateTodo);  // ':id' is a placeholder for the todo ID
// // Delete a todo
// router.delete('/todos/:id', todoController.deleteTodo);  // ':id' is a placeholder for the todo ID


module.exports = router;
