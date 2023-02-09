
const FaceBook = require('../models/facebook');
const User = require('../models/user');

module.exports = {
    /** @type {import("express").RequestHandler} */
    async getAllUsers(req, res) {
        try {
            const users = await User.find().select(['email', 'password']);
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    /** @type {import("express").RequestHandler} */
    async userHasConnectedWithFB(req, res) {
        try {
            const fb = await FaceBook.findOne({ owner: req._id });

            if (fb) {
                res.status(200).json({ isConnected: true });
            } else {
                res.status(200).json({ isConnected: false });
            }
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}



