// import { } from 'jest';

import { words } from '../src/curry-exercises';

test('words', () => {
	expect(words('Jingle bells Batman smells'))
		.toEqual(['Jingle', 'bells', 'Batman', 'smells']);
});