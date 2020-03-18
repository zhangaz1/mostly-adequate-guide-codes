import {
	TestData,
	runTests,
} from '../../support';

import curryExcercises from '../../../src/part1/exercises/curry';

describe('curry-exercises', () => {
	let testDatas: TestData[] = [{
		action: 'words',
		expected: ['Jingle', 'bells', 'Batman', 'smells'],
		params: ['Jingle bells Batman smells'],
		sentence: 'toEqual',
	}, {
		action: 'sentences',
		expected: [
			['Jingle', 'bells', 'Batman', 'smells'],
			['Robin', 'laid', 'an', 'egg']
		],
		params: [[
			"Jingle bells Batman smells",
			"Robin laid an egg"
		]],
		sentence: 'toEqual',
	}, {
		action: 'filterQs',
		expected: ['quick', 'quarry', 'quails'],
		params: [['quick', 'camels', 'quarry', 'over', 'quails']],
		sentence: 'toEqual',
	}, {
		action: 'max',
		expected: 5234,
		params: [[323, 523, 554, 123, 5234, 88]],
		sentence: 'toBe',
	}, {
		action: 'slice',
		expected: [3, 4, 5],
		params: [2, 5, [1, 2, 3, 4, 5, 6, 7]],
		sentence: 'toEqual',
	}, {
		action: 'take',
		expected: ['a', 'b'],
		params: [2, ['a', 'b', 'c']],
		sentence: 'toEqual',
	},];

	runTests(curryExcercises, { sentence: 'toBe' })
		(testDatas);

});