const { User } = require('../models/user.model');
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
    await User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        res
        .cookie("usertoken", userToken, process.env.SECRET_KEY,{
            httpOnly: true
        })
        .json({ msg: "success!", user: user, userToken: userToken });
    })
    .catch(err => {
        res.status(400).json(err)
    });
}


module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
    console.log(process.env.SECRET_KEY)
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
            httpOnly: true
        })
        .json({ msg: "success!", user: user, userToken: userToken });
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.createUser = (req, res) => {
    const { username, email, password } = req.body;
    User.create({
        username,
        email,
        password
    })
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
}

module.exports.getAllUsers = (req, res) => {
    User.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
}

module.exports.getUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json(err))
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}