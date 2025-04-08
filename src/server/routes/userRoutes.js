const express = require('express');


const userRouter = express.Router();
const UserModel = require('../models/userModel');
const { message } = require('antd');

userRouter.post('/register', async (req, res) => {
    try{
        const userExists = await UserModel.findOne({ email: req.body.email });
        if(userExists){
            res.status(400).json({ success : false ,message: 'User already exists' });
            res.send({ success: false, message: 'User already exists' });
        }else{
            const newUser = new UserModel(req.body);
            await newUser.save();
            res.status(201).json({ success : true ,message: 'User registered successfully' });
            res.send({ success: true, message: 'User registered successfully'});
        }

    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
});

userRouter.post('/login', async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });


    try{
        if(!user){
            res.status(400).json({ success: false, message: 'User not found' });
            // res.send({ success: false, message: 'User Deosnot exist' });
        }
        if(user.password !== req.body.password){
            res.status(400).json({ success: false, message: 'Invalid credentials' });
            // res.send({ success: false, message: 'Invalid credentials' });
        }
        


    }catch(err){
        res.status(500).json({ message: err.message });
        res.send({ success: false, message: err.message });
    }
});

module.exports = userRouter;