const FaceBook = require('../models/facebook');
const Story = require('../models/story');
const puppeteer = require('../puppeteer/index');

module.exports = {
    /** @type {import("express").RequestHandler} */
    async connectWithFaceBook(req, res) {
        try {
            const { username, password } = req.body;
            const logInData = await puppeteer.logInToFacebook(username, password);
            if (!logInData.loggedIn)
                return res.status(400).json({ message: 'Bad Creditential' });

            try {
                const _fb = await FaceBook.create({
                    username: username,
                    password: password,
                    cookies: logInData.cookies,
                    owner: req._id
                });

                res.status(200).json({ message: 'Connected Successfuly', facebook: _fb });

            } catch (error) {
                console.log('can not create facebook acount');
                return res.status(403).json({ message: 'can not create facebook acount' })
            }
        } catch (error) {
            res.status(401).json({ message: error });
        }
    },
    /** @type {import("express").RequestHandler} */
    async ScrapFaceBookStories(req, res) {
        try {
            const _fb = await FaceBook.findOne({ owner: req._id });

            if (_fb) {
                puppeteer.srapFBStories(fb.cookies).then((response) => {
                    return res.status(response.status).json(response.response);
                    stories.data.forEach(async function (story) {
                        const s = await Story.create({
                            name: story.name,
                            profile: story.profile,
                            picture: story.picture,
                            fb: _fb._id
                        });
                    });
                }).catch(error => {
                    return res.status(500).json({ message: 'All stories not Saved!!', facebook: _fb });
                });
            }
        } catch (error) {

        }
    },
    /** @type {import("express").RequestHandler} */
    async testPuppeteer(req, res) {
        const data = await puppeteer.testPuppeteer();
        //console.log(data);
        if (data.message == 'success')
            return res.status(200).json(data);
        return res.status(204).json(data);
    },
    /** @type {import("express").RequestHandler} */
    async testApp(req, res) {
        return res.status(200).json({ message: 'App working' });
    }

}