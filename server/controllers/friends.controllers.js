const mongoose = require('mongoose')
const Friends  = require('../models/friends.model');
const { User } = require('../models/user.model')


module.exports.addFriend = async (req, res) => {
    const {requesterId, recipientId} = req.body
    let UserA = mongoose.Types.ObjectId(requesterId)
    let UserB = mongoose.Types.ObjectId(recipientId)
    const docA = await Friends.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: {status: 1}},
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
    ).then(status => res.json(status))
}

module.exports.acceptFriend = async (req, res) => {
    const {requesterId, recipientId} = req.body
    let UserA = mongoose.Types.ObjectId(requesterId)
    let UserB = mongoose.Types.ObjectId(recipientId)
    await Friends.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: { status: 3 } }
    )
    await Friends.findOneAndUpdate(
        { recipient: UserA, requester: UserB },
        { $set: { status: 3 } }
    ).then(status => res.json(status))
}

module.exports.rejectFriend = async (req, res) => {
    const {requesterId, recipientId} = req.params
    let UserA = mongoose.Types.ObjectId(requesterId)
    let UserB = mongoose.Types.ObjectId(recipientId)
    const docA = await Friends.findOneAndDelete(
        { requester: UserA, recipient: UserB }
    )
    const docB = await Friends.findOneAndDelete(
        { recipient: UserA, requester: UserB }
    )
    const updateUserA = await User.findOneAndUpdate(
        { _id: UserA },
        { $pull: { friends: docA._id } }
    )
    const updateUserB = await User.findOneAndUpdate(
        { _id: UserB },
        { $pull: { friends: docB._id } }
    ).then(status => res.json(status))
}

module.exports.userFriends = async (req, res) => {
    // fix to not collect user passwords.
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
                            "recipient": mongoose.Types.ObjectId(id),
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
