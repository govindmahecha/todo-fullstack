const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const todoController = require('../controllers/todo');

// Validation middleware for todo ID parameter
const validateTodoId = param('id').isMongoId().withMessage('Invalid todo ID');

// Validation middleware for todo creation and update
const validateTodo = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status').isIn(['To Do', 'In Progress', 'Done']).withMessage('Invalid status'),
  body('description').optional().trim()
];

// Routes for CRUD operations
router.post('/todos', validateTodo, todoController.createTodo);
router.get('/todos', todoController.getAllTodos);
router.get('/todos/:id', validateTodoId, todoController.getTodoById);
router.put('/todos/:id', [validateTodoId, ...validateTodo], todoController.updateTodo);
router.delete('/todos/:id', validateTodoId, todoController.deleteTodo);

module.exports = router;