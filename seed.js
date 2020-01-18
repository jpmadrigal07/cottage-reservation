require('./models/User');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Cottage = mongoose.model('cottage');

const newAdmin = new User({
    username: 'admin',
    password: 'qwerty123',
    email: 'admin@sample.com',
    profilePicture: '/images/default-user.png',
    firstName: 'Admin',
    lastName: 'Admin',
    role: 'Administrator'
});

User.find({
    role: 'Administrator'
}, (err, foundUser) => {
    if (foundUser.length == 0) {
        newAdmin.save();
        Cottage.find({}, (err, foundCottage) => {
            if (foundCottage.length == 0) {
                newCottage.save();
            }
        })
    }
})

