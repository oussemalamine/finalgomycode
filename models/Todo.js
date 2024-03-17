const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },

    addedon: {
        type: Date,
        required: true,
        default: Date.now,
    },
    deadline: {
        type: Date,
  
    },
    urgency: {
        type: Number,  // Number for easier sorting/filtering
        enum: [1, 2, 3],  // 1 for low, 2 for medium, 3 for high
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
        get: () => this.completed,  // Computed property for task completion
    },
});

// Add custom validation, indexes, and middleware as needed

const Todo = mongoose.model('Todo', userSchema);

module.exports = Todo;
