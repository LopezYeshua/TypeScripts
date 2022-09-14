const FriendController = require('../controllers/friends.controllers')

module.exports = app => {
    app.put("/api/friends", FriendController.addFriend)
    app.get("/api/allFriends/:id", FriendController.userFriends)
    app.get("/api/friends", FriendController.allFriends)
}