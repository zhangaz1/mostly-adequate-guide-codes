import {
	testData,
	runTests,
} from '../support';
import composeExercises from '../../src/part1/compose';

describe('compose-exercise', () => {
	let testDatas: testData[] = [{
		action: 'isLastInStock',
		expected: false,
	}, {
		action: 'nameOfFirstCar',
		expected: 'Ferrari FF',
	}, {
		action: 'averageDollarValue',
		expected: 790700,
	}, {
		action: 'sanitizeNames',
		expected: ['ferrari_ff', 'spyker_c12_zagato', 'jaguar_xkr_s', 'audi_r8', 'aston_martin_one_77', 'pagani_huayra'],
		sentence: 'toEqual',
	}, {
		action: 'availablePrices',
		expected: '$700,000.00, $1,850,000.00',
		sentence: 'toBe',
	}, {
		action: 'fastestCar',
		expected: 'Aston Martin One-77 is the fastest',
		sentence: 'toBe',
	}];


	runTests(composeExercises, { params: [composeExercises.CARS] })
		(testDatas);
});