const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

// Update the timestamp on update
todoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create the Todo model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
