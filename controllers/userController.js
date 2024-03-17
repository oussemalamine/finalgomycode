const jwt = require('jsonwebtoken'); // Add this line to import the jsonwebtoken library
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds to use

const userController = {
  async register(req, res) {
    try {
        const { username, email, password, role } = req.body; // Added role
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password
        const newUser = new User({ username, email, password: hashedPassword, role }); // Passed role to User constructor
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    //   console.log('Password from request:', password);
    //   console.log('Hashed password from database:', user.password);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // If the username and password are valid, generate a JWT token
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send the token in the response
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updatePassword(req, res) {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        // Update the user's password in the database
        await User.findByIdAndUpdate(id, { password: hashedPassword });
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

};

module.exports = userController;
