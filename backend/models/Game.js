const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['sports', 'crypto', 'esports', 'culture', 'politics'],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    options: [{
        text: String,
        odds: Number,
        totalBets: { type: Number, default: 0 },
        totalAmount: { type: Number, default: 0 }
    }],
    status: {
        type: String,
        enum: ['upcoming', 'active', 'ended', 'settled'],
        default: 'upcoming'
    },
    result: {
        type: String,
        default: null
    },
    totalPool: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);