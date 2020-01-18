const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: String,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    profilePicture: String,
    role: {
        type: String,
        enum: ['Administrator', 'User'],
        default: 'User'
    },
    blockedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('user', userSchema);