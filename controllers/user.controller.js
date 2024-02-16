const User = require('../models/user.model');
const emailValidator = require('email-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async(req, res) => {
    const user = new User(req.body);
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        const emailExist = await User.findOne({ email });

        if (emailExist) return res.status(400).json({ message: 'Email already exists' });
  
        if (!emailValidator.validate(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }
       
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const authToken = await user.generateAuthTokenAndSaveUser();
        res.status(201).json({user, authToken});
       
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const loginUser = async(req, res) => {
    try{
    const user = await User.findUser(req.body.email, req.body.password);
   
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({user, authToken});
    }catch(err){
        res.status(400).send({message : err});
    }
}

const getAllUsers = async(req, res) => {
    try{
    const users = await User.find().select('-password');
    res.send(users);
    }
    catch(err){
        res.send({message : err});
    }
}

module.exports = { 
    createUser,
    loginUser,
    getAllUsers
};