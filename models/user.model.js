const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: emailValidator.validate,
            message: 'Invalid email'
        }
    },
    password: {
        type: String,
        required: true
    },
    authTokens: [{
        authToken: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthTokenAndSaveUser = async function() {
    const authToken = jwt.sign({_id: this._id.toString()}, process.env.SECRET);
    this.authTokens.push({ authToken }); 
    await this.save();
    return authToken;
};

userSchema.statics.findUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Email not found, please sign up');
    };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Password or Email is incorrect, please try again');
    }
    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;