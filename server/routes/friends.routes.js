const FriendController = require('../controllers/friends.controllers')

module.exports = app => {
    app.put("/api/friends", FriendController.addFriend)
    app.get("/api/allFriends/:id", FriendController.getFriends)
}