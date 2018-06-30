// Setup image snapshots
const {toMatchImageSnapshot} = require('jest-image-snapshot');

expect.extend({toMatchImageSnapshot});

// Make sure `jest` has the same timeout as puppeteer

jest.setTimeout(30000);