
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
    async getUser(req, res) {

    }
}



