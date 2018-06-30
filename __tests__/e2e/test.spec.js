const puppeteer = require('puppeteer');

describe('Given a web page', () => {
    let browser,
        page;

    const width = 1920;
    const height = 1080;
    const untilZeroNetworkConnectionsForHalfASecond = { waitUntil: 'networkidle2' };

    beforeAll(async () => {
        browser = await puppeteer.launch({
            args: [
                `--window-size=${width},${height}`,
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ],
            headless: true,
            slowMo: 80
        });
        page = await browser.newPage();
        await page.setViewport({
            height,
            width
        });
        await page.goto('https://www.google.com');
        await page.waitForNavigation(untilZeroNetworkConnectionsForHalfASecond);
    });

    it('should have the correct page title', async () => {
        const pageTitle = await page.title();

        expect(pageTitle).toEqual('Google');
    });

    afterAll(async () => {
        await browser.close();
    });
});