const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    selectedOption: {
        type: String,
        required: true
    },
    betAmount: {
        type: Number,
        required: true,
        min: 0.01
    },
    potentialWinning: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'won', 'lost', 'cancelled'],
        default: 'pending'
    },
    actualWinning: {
        type: Number,
        default: 0
    },
    transactionHash: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Prediction', predictionSchema);