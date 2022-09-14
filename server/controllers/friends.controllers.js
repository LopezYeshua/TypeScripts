const mongoose = require('mongoose')
const Friends  = require('../models/friends.model');
const { User } = require('../models/user.model')


module.exports.addFriend = async (req, res) => {
    const {requesterId, recipientId} = req.body
    let UserA = mongoose.Types.ObjectId(requesterId)
    let UserB = mongoose.Types.ObjectId(recipientId)
    const docA = await Friends.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: {
            status: 1
        }},
        { upsert: true, new: true }
    )
    const docB = await Friends.findOneAndUpdate(
        { recipient: UserA, requester: UserB },
        { $set: { status: 2 } },
        { upsert: true, new: true }
    )
    const updateUserA = await User.findOneAndUpdate(
        { _id: UserA },
        { $push: { friends: docA._id } }
    )
    const updateUserB = await User.findOneAndUpdate(
        { _id: UserB },
        { $push: { friends: docB._id } }
    )
}

module.exports.acceptFriend = async (req, res) => {
    const {requesterId, recipientId} = req.body
    let UserA = mongoose.Types.ObjectId(requesterId)
    let UserB = mongoose.Types.ObjectId(recipientId)
    Friends.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: { status: 3 } }
    )
    Friends.findOneAndUpdate(
        { recipient: UserA, requester: UserB },
        { $set: { status: 3 } }
    )
}

module.exports.rejectFriend = async (res, req) => {
    const {requesterId, recipientId} = req.body
    let UserA = mongoose.Types.ObjectId(requesterId)
    let UserB = mongoose.Types.ObjectId(recipientId)
    const docA = await Friends.findOneAndRemove(
        { requester: UserA, recipient: UserB }
    )
    const docB = await Friends.findOneAndRemove(
        { recipient: UserA, requester: UserB }
    )
    const updateUserA = await User.findOneAndUpdate(
        { _id: UserA },
        { $pull: { friends: docA._id } }
    )
    const updateUserB = await User.findOneAndUpdate(
        { _id: UserB },
        { $pull: { friends: docB._id } }
    )
}

module.exports.userFriends = async (req, res) => {
    const  userId = req.params
    let id = mongoose.Types.ObjectId(userId)
    let user = await User.aggregate([
        {
            "$lookup": {
                "from": "friends", //collection name
                "let": { "friends": "$friends" }, // set variable
                "pipeline": [
                    {
                        "$match": {
                            "requester": mongoose.Types.ObjectId(id),
                            "$expr": { "$in": ["$_id", "$$friends"] }
                        }
                    },
                    { "$project": { "status": 1 } }
                ],
                "as": "friends" // output array field
            }
        },
        {
            "$addFields": {
                friendsStatus: {
                    "$ifNull": [{ "$min": "$friends.status" }, 0]
                }
            },
        }
    ])
    res.json({user})
}

module.exports.allFriends = async (req, res) => {
    let user = await User.aggregate([
        {
            $lookup: {
                from: "friends",
                localField: "_id",
                foreignField: "recipient",
                as: "friends"
            }
            
        }
    ])

    res.json({user})
}