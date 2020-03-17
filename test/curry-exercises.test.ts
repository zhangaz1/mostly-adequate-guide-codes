import {
	words,
	sentences,
	filterQs,
	max,
	slice,
	take,
} from '../src/curry-exercises';

const expectEqual = (expected: any, actual: any) => expect(actual).toEqual(expected);
const expectBe = (expected: any, actual: any) => expect(actual).toBe(expected);

describe('curry-exercises', () => {
	test('words', () => {
		const result = words('Jingle bells Batman smells');
		const expected = ['Jingle', 'bells', 'Batman', 'smells'];
		expectEqual(result, expected);
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
		expectEqual(result, expected);
	});

	test('filterQs', () => {
		const result =
			filterQs(['quick', 'camels', 'quarry', 'over', 'quails'])
			;
		const expected = ['quick', 'quarry', 'quails'];
		expectEqual(result, expected);
	});

	test('max', () => {
		const result = max([323, 523, 554, 123, 5234, 88]);
		const expected = 5234;
		expectBe(result, expected);
	});

	test('slice', () => {
		const result = slice(2, 5, [1, 2, 3, 4, 5, 6, 7]);
		const expected = [3, 4, 5];
		expectEqual(result, expected);
	});

	test('take', () => {
		const result = take(2, ['a', 'b', 'c']);
		const expected = ['a', 'b'];
		expectEqual(result, expected);
	});
});