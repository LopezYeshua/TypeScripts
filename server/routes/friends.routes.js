const FriendController = require('../controllers/friends.controllers')

module.exports = app => {
    app.put("/api/friends", FriendController.addFriend)
    app.get("/api/allFriends/:id", FriendController.userFriends)
    app.put("/api/friends/accept", FriendController.acceptFriend)
    app.delete("/api/friends/reject/:requesterId/:recipientId", FriendController.rejectFriend)
}