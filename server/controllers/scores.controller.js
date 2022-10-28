const { Scores } = require('../models/scores.model')
const { User } = require('../models/user.model')
const mongoose = require('mongoose')

module.exports.createSinglePlayerScore = async (req, res) => {
    const { player1, game, wpm, timePlayed, points } = req.body
    let player = mongoose.Types.ObjectId(player1)
    const playerScore = await Scores.create({
        player1,
        game,
        wpm,
        timePlayed,
        points
    })
        .catch(err => res.status(400).json(err))
    await User.findOneAndUpdate(
        { _id: player },
        { $push: { scores: playerScore._id } }
    )
    .then(res => console.log(res))
}

module.exports.userScores = async (req, res) => {
    // fix to not collect user passwords.
    const  userId = req.params
    let id = mongoose.Types.ObjectId(userId)
    let user = await User.aggregate([
        {
            "$lookup": {
                "from": "scores", //collection name
                "let": { "scores": "$scores" }, // set variable
                "pipeline": [
                    {
                        "$match": {
                            "player1": mongoose.Types.ObjectId(id),
                            "$expr": { "$in": ["$_id", "$$scores"] }
                        }
                    },
                    { "$project": { 
                        "points": 1,
                        "game": 1,
                        "timePlayed": 1,
                        "wpm": 1,
                        "createdAt": {
                            "$dateToString": {
                                "format": "%d/%m/%Y %H:%M",
                                "timezone": "America/Los_Angeles",
                                "date": "$createdAt"
                            }
                        }
                    } }
                ],
                "as": "scores",                
            },
        },
        {
            "$match": {
                "_id": mongoose.Types.ObjectId(id)
            }
        }
    ])
    res.json({user})
}