import R from 'ramda';

import expects from './expects';

interface DefaultTestData {
	params?: any[],
	sentence?: keyof typeof expects,
};

export interface TestData extends DefaultTestData {
	action: string,
	expected: any,
	handler?: (done: () => void) => void,
};

interface ActualDefaultTestData extends DefaultTestData {
	sentence: keyof typeof expects,
}

const DEFAULT_TEST_DATA_FIELDS: ActualDefaultTestData = {
	params: [],
	sentence: 'toEqual'
};

export const runTests = (testTarget: any, specialDefaultFields: DefaultTestData) => {
	const {
		params: defaultParams,
		sentence: defaultSentence
	}: ActualDefaultTestData = R.merge(
		DEFAULT_TEST_DATA_FIELDS,
		specialDefaultFields
	);

	const _testTarget = R.prop(R.__, testTarget)
	const _expectes = R.prop(R.__, expects);

	return R.forEach(({
		action,
		expected,
		params = defaultParams,
		sentence = defaultSentence,
		handler,
	}: TestData) => {
		test(action, (handler) || (() => {
			const result = _testTarget(action)
				.apply(testTarget, params);

			_expectes(sentence)(expected, result);
		}));
	});
};