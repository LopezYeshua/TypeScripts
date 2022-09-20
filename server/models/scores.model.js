const mongoose = require('mongoose')

const ScoresSchema = new mongoose.Schema({
    player1: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users'
    },
    player2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    rank: {
        type: Number
    },
    game: {
        type: String
    },
    wpm: {
        type: Number
    },
    accuracy: {
        type: Number
    },
    timePlayed: {
        type: Date
    },
    points: {
        type: Number
    }
}, { timestamps: true })

module.exports.Scores = mongoose.model('Scores', ScoresSchema)