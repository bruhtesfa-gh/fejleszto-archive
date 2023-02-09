const User = require('../models/user');
const FaceBook = require('../models/facebook');
const logInToFacebook = require('../puppeteer/index').logInToFacebook;
const Story = require('../models/story');
module.exports = {
    /** @type {import("express").RequestHandler} */
    async createFaceBookStories(req, res) {
        try {

        } catch (error) {

        }
    },
    /** @type {import("express").RequestHandler} */
    async getAllStories(req, res) {
        try {
            const facebook = await FaceBook.findOne({ owner: req._id });
            if (facebook) {
                const stories = await Story.find({ fb: facebook._id });
                if (stories) {
                    res.status(200).json(stories);
                } else {
                    res.status(400).json([]);
                }
            } else {
                res.status(400).json([]);
            }
        } catch (error) {
            res.status(500).json({ 'message': error + '\n' });
        }
    }
}