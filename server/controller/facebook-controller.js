const User = require('../models/user');
const FaceBook = require('../models/facebook');
const logInToFacebook = require('../puppeteer/index').logInToFacebook;
const Story = require('../models/story');
const puppeteer = require('../puppeteer/index');

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
                    res.status(200).json([]);
                }
            } else {
                res.status(200).json([]);
            }
        } catch (error) {
            res.status(500).json({ 'message': error + '\n' });
        }
    },
    /** @type {import("express").RequestHandler} */
    async ScrapFaceBookStories(req, res) {

        try {
            const _fb = await FaceBook.findOne({ owner: req._id });
            if (_fb) {
                puppeteer.srapFBStories(_fb.cookies).then((response) => {
                    return res.status(response.status).json(response.response);
                    // stories.data.forEach(async function (story) {
                    //     const s = await Story.create({
                    //         name: story.name,
                    //         profile: story.profile,
                    //         picture: story.picture,
                    //         fb: _fb._id
                    //     });
                    // });
                }).catch(error => {
                    console.log(error);
                    return res.status(500).json({ message: 'All stories not Saved!!', facebook: _fb });
                });
            }
        } catch (error) {

        }
    }
}