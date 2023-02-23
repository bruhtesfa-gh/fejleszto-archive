const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer');
const User = require('../models/user');
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const download = require('download')
const logInToFacebook = async (username, password) => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
    const page = await browser.newPage();
    try {
        await page.goto("https://www.facebook.com/login");
        await page.waitForSelector('body > div._10._9o-w.uiLayer._4-hy._3qw', { visible: true });
        await page.addStyleTag({
            content: 'body > div._10._9o-w.uiLayer._4-hy._3qw { display: none !important; }',
        });
        await page.type('#email', username);
        await page.type('#pass', password);
        await page.click("#loginbutton");
        const navigation = await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        console.log(navigation.url());
        if (navigation.url() === 'https://www.facebook.com/' || navigation.url() === 'https://www.facebook.com') {
            const loggedIn = true;
            const _cookies = await page.cookies();
            const cookies = JSON.stringify(_cookies, null, 2);
            return {
                loggedIn,
                cookies
            }
        } else {
            const loggedIn = false;
            const cookies = null;
            return {
                loggedIn,
                cookies
            }
        }
    } catch (error) {
        const loggedIn = false;
        const cookies = null;
        return {
            loggedIn,
            cookies
        }
    }

}
/**
 * login to a customer fb account and grap all stories metadata
 * @param {string} cookies 
 * @returns 
 */
const srapFBStoriesUrl = async (cookies) => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image') {
            req.abort();
        }
        else {
            req.continue();
        }
    });
    try {
        const cookie = JSON.parse(cookies);
        await page.setCookie(...cookie);
        await page.goto("https://www.facebook.com").catch(error => {
            return {
                status: 500, response: {
                    data: null,
                    cause: 'time out to load'
                }
            };
        });
        //                              div.x9f619.x1n2onr6.x1ja2u2z.x1wsgfga.x9otpla.xwib8y2.x1y1aw1k > div > div > div
        const stories = await page.$$eval('div.x193iq5w.xgmub6v.x1ceravr > div > div > div.x9f619.x193iq5w > div > div a', (_stories, index) => {
            return _stories.filter((story, index) => {
                return index !== 0;
            }).map((a) => {
                //let a = story.querySelector('.x1n2onr6>a');
                if (a) {
                    return {
                        'name': a.getAttribute('aria-label').substring(0, a.getAttribute('aria-label').length - 8),
                        'profile': a.querySelector('div > div > div.x10l6tqk.x17qophe.x13vifvy.x47corl > div > img').getAttribute('src'),
                        'url': 'https://www.facebook.com' + a.getAttribute('href')
                    }
                } else {
                    return {
                        'name': '',
                        'profile': '',
                        'url': ''
                    }
                }
            });
        });
        //console.log(stories);
        await browser.close();
        return {
            status: 200, response: {
                stories,
                cause: 'success'
            }
        };
    } catch (error) {
        return {
            status: 500, response: {
                stories: [],
                cause: 'could not scrap'
            }
        };
    }

}

/**
 * download video and Images of story using url from third party
 * @param {string} url 
 * @returns 
 */
const scrapFaceBookStoriesData = async (url) => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
    const downloadpage = await browser.newPage();
    await downloadpage.setRequestInterception(true);
    const blocked_domains = [
        'googlesyndication.com',
        'adservice.google.com',
    ];
    downloadpage.on('request', (req) => {
        const url = req.url();
        if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image' || blocked_domains.some(domain => url.includes(domain))) {
            req.abort();
        }
        else {
            req.continue();
        }
    });
    try {
        await downloadpage.goto("https://www.fbvideodown.com/").catch(error => {
            return [];
        });
        await downloadpage.type('#function-area > div > div.input-wrapper > input', url)
        await downloadpage.click('#function-area > div > div.btn.functionAreaBtn');
        await new Promise(r => setTimeout(r, 2000));
        let exists = await downloadpage.$eval('#dl-area > div > div', () => true).catch(() => false)
        if (!exists) {
            exists = await downloadpage.$eval('#dl-area > div > div', () => true).catch(() => false)
            await new Promise(r => setTimeout(r, 1000));
            if (!exists) {
                console.log('no data');
                await browser.close();
                return []
            }
        }
        console.log('try to find urls');
        const storiesUrl = await downloadpage.$$eval('#dl-area > div > div', (result) => {
            return result.map(r => {
                let url = '';
                if (r.firstElementChild.tagName === 'IMG') {
                    url = r.querySelector('img').getAttribute('src');
                } else {
                    url = r.querySelector('video > source').getAttribute('src');
                }
                return url;
            });
        });
        console.log(storiesUrl);
        const files = [];
        async function downloadFile(urls) {
            return await Promise.all(urls.map((url) => download(url, "storage/facebook").then(res => {
                files.push('storage/facebook/' + url.substring(url.lastIndexOf('/') + 1))
            })))
        };
        await downloadFile(storiesUrl);
        //console.log(files);
        await browser.close()
        return files
    } catch (error) {
        console.log(error);
        return [];
    }
}

const testPuppeteer = async () => {
    // const path = await chromium.executablePath;
    // console.log(path);
    // chromium.puppeteer.launch
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized', '--no-sandbox'],
    });
    const page = await browser.newPage();
    try {
        await page.goto("https://www.wikipedia.org/");
        const title = await page.title()
        //await browser.close();
        return {
            'message': 'success',
            'title': title
        }
    } catch (error) {
        return {
            'message': 'error',
            'title': ''
        }
    }
}

const puppeteerMethods = {
    logInToFacebook,
    srapFBStoriesUrl,
    scrapFaceBookStoriesData,
    testPuppeteer
};

module.exports = puppeteerMethods;