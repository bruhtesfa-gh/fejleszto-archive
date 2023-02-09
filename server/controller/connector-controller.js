const FaceBook = require('../models/facebook');
const Story = require('../models/story');
const puppeteer = require('../puppeteer/index');

module.exports = {
    /** @type {import("express").RequestHandler} */
    async connectWithFaceBook(req, res) {
        try {
            const { username, password } = req.body;
            const isAuth = await puppeteer.logInToFacebook(username, password);
            if (!isAuth)
                return res.status(400).json({ message: 'Bad Creditential' });
            try {
                const _fb = await FaceBook.create({
                    username: username,
                    password: password,
                    owner: req._id
                });
                puppeteer.srapFBStories(username, password).then((stories) => {
                    stories.data.forEach(async function (story) {
                        const s = await Story.create({
                            name: story.name,
                            profile: story.profile,
                            picture: story.picture,
                            fb: _fb._id
                        });
                    });
                }).catch(error => {
                    return res.status(200).json({ message: 'All stories not Saved!!', facebook: _fb });
                });
                res.status(200).json({ message: 'All stories Saved!!', facebook: _fb });

            } catch (error) {
                console.log('can not create facebook acount');
                return res.status(500).json({ message: 'can not create facebook acount' })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    },
}