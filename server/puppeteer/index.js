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

const srapFBStories = async (cookies) => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
    const page = await browser.newPage();

    try {
        const delay = (time) => {
            return new Promise(function (resolve) {
                setTimeout(resolve, time)
            });
        };
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
        const data = await page.$$eval('div.x9f619.x1n2onr6.x1ja2u2z.x1wsgfga.x9otpla.xwib8y2.x1y1aw1k > div > div > div', (stories) => {
            return stories.filter((story, index) => {
                return index !== 0;
            }).map((story, index) => {
                let a = story.querySelector('.x1n2onr6>a');
                if (a) {
                    return {
                        'name': a.getAttribute('aria-label').substring(0, a.getAttribute('aria-label').length - 8),
                        'picture': a.querySelector('div > div > div.x1g0ag68.xx6bhzk.x11xpdln.xcj1dhv.x1ey2m1c.x9f619.xds687c.x10l6tqk.x17qophe.x13vifvy > img').getAttribute('src'),
                        'profile': a.querySelector('div > div > div.x10l6tqk.x17qophe.x13vifvy.x47corl > div > img').getAttribute('src'),
                        'url': 'https://www.facebook.com' + a.getAttribute('href')
                    }
                } else {
                    return {
                        'name': '',
                        'picture': '',
                        'profile': '',
                        'url': ''
                    }
                }
            });
        });
        //console.log(data);
        //await browser.close();
        console.log('trying to open new tab');
        const responseData = await Promise.all(data.map(async (story) => {
            const downloadpage = await browser.newPage();
            await downloadpage.goto("https://www.fbvideodown.com/").catch(error => {
                console.log(error)
                return {
                    ...story, files: ['bado']
                };
            });
            await downloadpage.type('#function-area > div > div.input-wrapper > input', 'https://www.facebook.com/stories/107031310648971/UzpfSVNDOjUzOTIzOTkzODE4ODU0MQ==/?bucket_count=9&source=story_tray')
            await downloadpage.click('#function-area > div > div.btn.functionAreaBtn');
            delay(500);
            const data_container = await downloadpage.waitForSelector('#dl-area > div');
            if (!data_container)
                delay(500);
            if (!data_container)
                return {
                    ...story, files: ['bado 2']
                }
            console.log('trying to access');
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

            const files = [];
            async function downloadFile(urls) {
                return await Promise.all(urls.map((url) => download(url, "storage/facebook").then(res => {
                    files.push('storage/facebook/' + url.substring(url.lastIndexOf('/') + 1))
                })))
            };
            await downloadFile(storiesUrl);
            return {
                ...story, files
            }
        }));

        await browser.close();
        return {
            status: 200, response: {
                data: responseData,
                cause: 'success'
            }
        };


    } catch (error) {
        console.log(error);
        return {
            status: 500, response: {
                data: null,
                cause: 'could not scrap'
            }
        };
    }

}



const puppeteerMethods = {
    logInToFacebook,
    srapFBStories,
};

module.exports = puppeteerMethods;