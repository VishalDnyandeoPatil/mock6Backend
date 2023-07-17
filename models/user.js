const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
 
  email: { type: String, required: true, unique: true },
 
  createdAt: { type: Date, default: Date.now }

});

const User = mongoose.model('user', userSchema);

module.exports = {User};
