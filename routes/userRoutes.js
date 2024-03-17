// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.register);
router.post('/login', userController.login);

// Delete user route
router.delete('/api/users/:id', userController.deleteUser);

// Route to update user password
router.put('/api/users/:id/password', userController.updatePassword);

module.exports = router;
