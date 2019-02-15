const { TIME, dom } = global;

test(
	'Check for element',
	async () => {
		await dom.tillExists('test');
	},
	TIME
);
