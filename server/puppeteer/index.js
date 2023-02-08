const puppeteer = require('puppeteer');
const User = require('../models/user');

const logInToFacebook = async (username, password) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.facebook.com/login");
    await page.waitForSelector(".clearfix ._1kbt");
    await page.type('.clearfix ._1kbt', username);
    await page.waitForSelector(".clearfix ._9npi");
    await page.type('.clearfix ._9npi', password);
    await page.waitForSelector("._xkt button");
    await page.click("._xkt button");
    heading = await page.$eval('a', heading => heading.getAttribute('aria-label'));
    return heading === 'Facebook'
}

const srapFBStories = async (username, password) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.facebook.com/login");
    await page.waitForSelector(".clearfix ._1kbt");
    await page.type('.clearfix ._1kbt', username);
    await page.waitForSelector(".clearfix ._9npi");
    await page.type('.clearfix ._9npi', password);
    await page.waitForSelector("._xkt button");
    await page.click("._xkt button");
    heading = await page.$eval('a', heading => heading.getAttribute('aria-label'));

    if (heading == 'Facebook') {
        const data = await page.$$eval('.x98rzlu', stories => {
            return stories.filter((story, index) => {
                return index !== 0 && story.querySelector('.x1n2onr6>a') !== null;
            }).map((story, index) => {
                let a = story.querySelector('.x1n2onr6>a');
                if (a) {
                    return {
                        'name': a.getAttribute('aria-label').substring(0, a.getAttribute('aria-label').length - 8),
                        'picture': a.querySelector('.x1g0ag68>img').getAttribute('src'),
                        'profile': a.querySelector('.x10l6tqk>.x6s0dn4>img').getAttribute('src')
                    }
                } else {
                    return {
                        'name': '',
                        'picture': '',
                        'profile': ''
                    }
                }
            });
        });

        return { status: 200, data: data };
    } else {
        return { status: 400, message: 'Bad Creditential' };
    }
}

const puppeteerMethods = {
    logInToFacebook,
    srapFBStories,
};

module.exports = puppeteerMethods;