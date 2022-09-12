const { Friend } = require('../models/friends.model');

module.exports.addFriend = async (req, res) => {
    const docA = await Friend.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: { status: 1 } },
        { upsert: true, new: true }
    )
    const docB = await Friend.findOneAndUpdate(
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
    Friend.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: { status: 3 } }
    )
    Friend.findOneAndUpdate(
        { recipient: UserA, requester: UserB },
        { $set: { status: 3 } }
    )
}

module.exports.rejectFriend = async (res, req) => {
    const docA = await Friend.findOneAndRemove(
        { requester: UserA, recipient: UserB }
    )
    const docB = await Friend.findOneAndRemove(
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

module.exports.getFriends = async (res, req) => {
    let {id} = req.params
    let user = User.aggregate([
        {
            "$lookup": {
                "from": Friend.collection.name,
                "let": { "friends": "$friends" },
                "pipeline": [
                    {
                        "$match": {
                            "recipient": mongoose.Types.ObjectId(id),
                            "$expr": { "$in": ["$_id", "$$friends"] }
                        }
                    },
                    { "$project": { "status": 1 } }
                ],
                "as": "friends"
            }
        },
        {
            "$addFields": {
                "friendsStatus": {
                    "$ifNull": [{ "$min": "$friends.status" }, 0]
                }
            }
        }
    ])

    res.json({
        user
    })
}