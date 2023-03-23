const User = require('../models/user');
const download = require('download');
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
                    console.log(data.response.stories)
                    if (data.status === 200) {
                        for await (story of data.response.stories) {
                            let { name, profile, thumbnail, url } = story;
                            const files = await puppeteer.scrapFaceBookStoriesData(url);
                            if (files.length > 0) {
                                // download(thumbnail, "storage/facebook/thumbnail").then((result) => {
                                //     thumbnail = '/facebook/thumbnail/' + thumbnail.substring(thumbnail.lastIndexOf('/') + 1)
                                // }).catch((err) => {

                                // });
                                // download(profile, "storage/facebook/thumbnail").then((result) => {
                                //     profile = '/facebook/thumbnail' + profile.substring(profile.lastIndexOf('/') + 1)
                                // }).catch((err) => {

                                // });
                                const s = await Story.create({ name, profile, thumbnail, files, fb: _fb._id });
                                total_stories++;
                            }
                        }
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