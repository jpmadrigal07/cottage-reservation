const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    cottageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cottage"
    },
    date: String,
    approvedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: Date
});

mongoose.model('reservation', reservationSchema);