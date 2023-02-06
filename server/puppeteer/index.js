const puppeteer = require('puppeteer');
const User = require('../models/User');

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
    await page.waitForNavigation();
    const home_page = await page.waitForSelector(".x98rzlu");
    if (home_page) {
        return await page.$$eval('.x98rzlu', stories => {
            return stories.filter((story, index) => {
                return index !== 0 && story.querySelector('.x1n2onr6>a') !== null;
            }).map((story, index) => {
                let a = story.querySelector('.x1n2onr6>a');
                if (a) {
                    return {
                        'tagger': a.getAttribute('aria-label').substring(0, a.getAttribute('aria-label').length - 8),
                        'tumbnaile': a.querySelector('.x1g0ag68>img').getAttribute('src'),
                        'profile': a.querySelector('.x10l6tqk>.x6s0dn4>img').getAttribute('src')
                    }
                } else {
                    return {
                        'tagger': '',
                        'tumbnaile': '',
                        'profile': ''
                    }
                }
            });
        });
    } else {
        return false;
    }
}


const puppeteerMethods = {
    logInToFacebook,
};

module.exports = puppeteerMethods;