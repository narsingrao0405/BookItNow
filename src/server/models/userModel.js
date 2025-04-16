const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: false,
    },
    UserRole: {
        type: String,
        enum: ['admnin','user','partner'],
        default: 'user',
        required: false,
    }
   
});
const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;