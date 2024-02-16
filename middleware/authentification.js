const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authentification = async (req, res, next) => {
    try{
      const authToken = req.header('Authorization').replace('Bearer ', '');
      const decodedToken = jwt.verify(authToken, 'test');
      const user = await User.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });
        if(!user){
            throw new Error("User not found, please sign up first");
        }

        req.user = user;
        next();
    }catch(err){
        res.status(400).send({"Authentification error" : "Please authenticate first"});
    }
}

module.exports = authentification;