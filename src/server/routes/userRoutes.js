const express = require('express');


const userRouter = express.Router();
const UserModel = require('../models/userModel');
const { message } = require('antd');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

userRouter.post('/register', async (req, res) => {
    console.log("Create User API Body",req.body);
    try{
        const userExists = await UserModel.findOne({ email: req.body.email });
        if(userExists){
            return res.status(400).json({ success : false ,message: 'User already exists' });
            //res.send({ success: false, message: 'User already exists' });
        }else{
            const newUser = new UserModel(req.body);
            await newUser.save();
            return res.status(201).json({ success : true ,message: 'User registered successfully' });
            //res.send({ success: true, message: 'User registered successfully'});
        }

    }catch(err){
       return res.status(500).json({ message: 'Server error' });
    }
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
        //res.send({ success: false, message: 'Please enter all fields' });
    }
    const user = await UserModel.findOne({ email: req.body.email });



    try{
        if(!user){
            return res.status(400).json({ success: false, message: 'User not found' });
            //res.send({ success: false, message: 'User Deosnot exist' });
        }
        if(user.password !== req.body.password){
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
            // res.send({ success: false, message: 'Invalid credentials' });
        }
        const token =jwt.sign({userId: user._id },process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        console.log("User Token:::::::",token);
        
        return res.status(200).json({ success: true, message: 'Login successful', data: token });

        
    }catch(err){
       return res.status(500).json({ message: err.message });
        //res.send({ success: false, message: err.message });
    }
});

userRouter.get('/current', authMiddleware, async (req, res) => {
    console.log("Request Header ::::::::::::::", req.headers.authorization);
    res.send({ success: true, message: "You are authorized user" });
});

module.exports = userRouter;