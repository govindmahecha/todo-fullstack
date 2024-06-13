const { validationResult } = require('express-validator');
const Todo = require('../models/todo');

// Create a new todo
const createTodo = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.uid;
  try {
    const { title, description, status } = req.body;
    const todo = new Todo({
      userId,
      title,
      description,
      status
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const userId = req.uid;
    let query = { userId, deleted: false };

    // Check if status is provided in the query parameters
    const status = req.query.status;
    if (status && status !== 'All') {
      query.status = status;
    }

    // Check if keyword is provided in the query parameters
    const keyword = req.query.keyword;
    if (keyword && keyword !== 'All') {
      if (keyword === 'To Do') {
        query.status = 'To Do';
      } else if (keyword === 'In Progress') {
        query.status = 'In Progress';
      } else if (keyword === 'Done') {
        query.status = 'Done';
      }
    }

    const todos = await Todo.find(query);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single todo
const getTodoById = async (req, res) => {
  try {
    const userId = req.uid;
    const todo = await Todo.findById({_id: req.params.id, userId});
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  // Check for validation errors
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.uid;
    const { title, description, status } = req.body;
    const todo = await Todo.findById({_id: req.params.id, userId});
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.title = title;
    todo.description = description;
    todo.status = status;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a todo (soft delete)
const deleteTodo = async (req, res) => {
  try {
    const userId = req.uid;
    const todo = await Todo.findById({_id: req.params.id, userId});
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.deleted = true;
    await todo.save();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    createTodo,
    updateTodo,
    getTodoById,
    getAllTodos,
    deleteTodo
}