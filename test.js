const { remote } = require('webdriverio');
const { domActions } = require('./dom');

(async () => {
	const browser = await remote({
		logLevel: 'error',
		path: '/',
		capabilities: {
			browserName: 'firefox'
		}
	});
	const dom = domActions(browser);
	await browser.url('https://webdriver.io');

	// const title = await browser.getTitle();
	// console.log('Title was: ' + title);
	const exists = await dom.tillExists('test');
	// console.log(exists ? 'Element found' : 'Not found');
	await browser.deleteSession();
})().catch((e) => console.error(e));
