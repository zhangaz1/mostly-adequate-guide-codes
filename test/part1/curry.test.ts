import {
	hasmethod,
	testData,
	expects,
} from '../support';

import {
	words,
	sentences,
	filterQs,
	max,
	slice,
	take,
} from '../../src/part1/curry';

describe('curry-exercises', () => {
	const _expects = expects as hasmethod;
	test('words', () => {
		const result = words('Jingle bells Batman smells');
		const expected = ['Jingle', 'bells', 'Batman', 'smells'];
		_expects.toEqual(result, expected);
	});

	test('sentences', () => {
		const result =
			sentences([
				"Jingle bells Batman smells",
				"Robin laid an egg"
			])
			;
		const expected = [
			['Jingle', 'bells', 'Batman', 'smells'],
			['Robin', 'laid', 'an', 'egg']
		];
		_expects.toEqual(result, expected);
	});

	test('filterQs', () => {
		const result =
			filterQs(['quick', 'camels', 'quarry', 'over', 'quails'])
			;
		const expected = ['quick', 'quarry', 'quails'];
		_expects.toEqual(result, expected);
	});

	test('max', () => {
		const result = max([323, 523, 554, 123, 5234, 88]);
		const expected = 5234;
		_expects.toBe(result, expected);
	});

	test('slice', () => {
		const result = slice(2, 5, [1, 2, 3, 4, 5, 6, 7]);
		const expected = [3, 4, 5];
		_expects.toEqual(result, expected);
	});

	test('take', () => {
		const result = take(2, ['a', 'b', 'c']);
		const expected = ['a', 'b'];
		_expects.toEqual(result, expected);
	});
});