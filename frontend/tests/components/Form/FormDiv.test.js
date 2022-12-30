const { render } = require('react-dom');

test('test input', () => {
	render(<FormDiv />);

	screen.debug();
});
