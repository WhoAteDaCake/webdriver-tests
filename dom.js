function domActions(webdriver) {
	function exists(selector) {
		return webdriver.$(selector).then((e) => e.isExisting()).catch((e) => false);
	}

	function tillExists(selector, timeout) {
		return webdriver.waitUntil(() => exists(selector), timeout);
	}

	function setValue(selector, value) {
		return webdriver.$(selector).then((e) => e.setValue(value));
	}

	function setValues(list) {
		return Promise.all(list.map(([ selector, value ]) => setValue(selector, value)));
	}

	function click(selector) {
		return webdriver.$(selector).then((e) => e.click());
	}

	function clickSeq(links) {
		return sequenceP(Promise.resolve(), links.map((selector) => () => click(selector)));
	}

	function clickAndWait(clickSel, waitSel, timeout) {
		let actions = [];

		if (typeof clickSel === 'string') {
			actions.push(() => click(clickSel));
		} else if (Array.isArray(clickSel)) {
			actions.push(() => clickSeq(clickSel));
		} else {
			throw new TypeError('Unsupported click selector');
		}
		// Wait till element appears
		actions.push(() => tillExists(waitSel, timeout));
		return sequenceP(Promise.resolve(), actions);
	}

	return { exists, tillExists, setValue, setValues, click, clickSeq, clickAndWait };
}
module.exports = { domActions };
