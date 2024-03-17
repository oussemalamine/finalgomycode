
  const Todo = require('../models/Todo');



  const todoController = {
    async addToDo(req, res) {
      try {
        const { title, description, assignedto, addedon, deadline, urgency, status } = req.body;
        // Create a new Todo object from request data
        const newTodo = new Todo({
          title,
          description,
          assignedto,
          addedon,
          deadline,
          urgency,
          status,
        });
        await newTodo.save(); // Save the new Todo object to the database
        res.status(201).json({ message: 'card added successfully' });
      } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
 // GET ALL TODOs
async getAllTodos(req, res) {
  try {
    // Use projection to fetch only necessary fields
    const todos = await Todo.find({}); // Adjust fields as needed

    res.status(200).json({ todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

    
    // UPATE TO DO !!

    // DELETE TO DO !!

    
  };


  module.exports = todoController;
