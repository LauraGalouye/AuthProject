const User = require('../models/user');
const emailValidator = require('email-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async(req, res) => {

    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        
        const emailExist = await User.findOne({ email });
        if (emailExist) return res.status(400).json({ message: 'Email already exists' });

  
        if (!emailValidator.validate(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Validez la force du mot de passe
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Hachez le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créez un nouvel utilisateur avec le mot de passe haché
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Enregistrez l'utilisateur dans la base de données
        const savedUser = await  user.save();
        res.status(201).json({ user: savedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const loginUser = async(req, res) => {
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).json({error : 'Email not found, please sign up'});
 
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({error : 'Invalid email or password'});

    const token = jwt.sign({name : user.name, id : user.id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    res.json(token)
}

// const getAllUsers = async(req, res) => {
//     const users = await User.find();
//     res.json(users);

// }

module.exports = { 
    createUser,
    loginUser,
    // getAllUsers
};