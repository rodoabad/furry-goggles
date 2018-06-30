const puppeteer = require('puppeteer');

describe('Given a web page', async () => {
    let browser,
        page;

    const width = 1920;
    const height = 1080;

    beforeEach(async () => {
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
        await page.goto('https://google.com');
    });

    it('should pass visual regression', async () => {
        const screenshot = await page.screenshot();

        expect(screenshot).toMatchImageSnapshot({
            customSnapshotIdentifier: 'screenshot',
            failureThreshold: '0.05',
            failureThresholdType: 'percent'
        });
    });

    test('page title', async () => {
        const pageTitle = await page.title();

        const expectedTitle = 'Google';

        expect(pageTitle).toEqual(expectedTitle);

    });

    afterEach(async () => {
        await browser.close();
    });
});