const express = require('express');
const {User} = require('../models/user');
const routerUser = express.Router();

routerUser.post('/register', async (req, res) => {
    const { username, email } = req.body;
  try {
     let user = await User.findOne({ email });

     if (user) {
       return res.status(200).json({ message: 'Already exists user', user });
     }
 
     user = new User({ username, email });
     await user.save();
 
     return res.status(201).json({ message: 'User successfully created', user });
   
  } catch (error) {
    res.status(500).json({ error: 'create user fail' });
  }
});

module.exports = {routerUser};