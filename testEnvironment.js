const { remote } = require('webdriverio');
const { domActions } = require('./dom');
const chalk = require('chalk');
const NodeEnvironment = require('jest-environment-node');

async function createDriver(params) {
	const client = await remote({
		logLevel: 'error',
		path: '/',
		capabilities: {
			browserName: 'firefox'
		}
	});
	await client.url('https://www.google.com');
	return client;
}

class WebdriverEnv extends NodeEnvironment {
	constructor(config) {
		super(config);
	}

	async setup() {
		console.log(chalk.magenta('Setup Test Environment.'));
		await super.setup();
		const webdriver = await createDriver();
		const dom = domActions(webdriver);
		console.log(chalk.magenta('Webdriver initiated'));
		try {
			await login(dom);
		} catch (e) {}
		this.global.webdriver = webdriver;
		this.global.dom = dom;
		this.global.TIME = 1000 * 60 * 3;
		console.log(chalk.magenta('Done'));
	}

	async teardown() {
		console.log(chalk.magenta('Teardown Test Environment.'));
		const { webdriver, dom } = this.global;
		console.log(chalk.magenta('Destroying sessions'));
		if (webdriver) {
			await webdriver.deleteSession();
		}
		await super.teardown();
	}

	runScript(script) {
		return super.runScript(script);
	}
}

module.exports = WebdriverEnv;
