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
            let total_stories = 0;
            const _fb = await FaceBook.findOne({ owner: req._id });
            if (_fb) {
                puppeteer.srapFBStoriesUrl(_fb.cookies).then(async (data) => {
                    console.log(data.status)
                    if (data.status === 200) {
                        for await (story of data.response.stories) {
                            const { name, profile, url } = story;

                            const files = await puppeteer.scrapFaceBookStoriesData(url);
                            console.log(files);
                            if (files.length > 0) {
                                const s = await Story.create({ name, profile, files, fb: _fb._id });
                                total_stories++;
                            }
                        }
                        // await data.response.stories.forEach(async (story) => {

                        // });
                        console.log(total_stories)
                        if (total_stories > 0) {
                            return res.status(200).json({ message: 'Stories Saved!' });
                        }
                        return res.status(204).json({ message: 'could not save Stories' });
                    } else {
                        return res.status(204).json({ message: 'could not save Stories' });
                    }
                }).catch(error => {
                    console.log(error);
                    return res.status(204).json({ message: 'All stories not Saved!!', facebook: _fb });
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(204).json({ message: 'could not save Stories some Error occure' });
        }
    }
}