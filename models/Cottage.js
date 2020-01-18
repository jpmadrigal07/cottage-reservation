const mongoose = require('mongoose');
const { Schema } = mongoose;

const cottageSchema = new Schema({
    name: String,
    desc: String,
    price: String,
    imagePath: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: Date
});

mongoose.model('cottage', cottageSchema);