const ScoreController = require('../controllers/scores.controller')

module.exports = app => {
    app.post("/api/scores/1", ScoreController.createSinglePlayerScore)
    app.get("/api/scores/userScores/:id", ScoreController.userScores)
}