import R from 'ramda';

export interface hasmethod {
	[index: string]: Function,
};

export interface defaultTestData {
	params?: any[],
	sentence?: string,
}

export interface testData extends defaultTestData {
	action: string,
	expected: any,
};

export const expects = {
	toEqual: (expected: any, actual: any) => expect(actual).toEqual(expected),
	toBe: (expected: any, actual: any) => expect(actual).toBe(expected),
};

export const runTests = (testTarget: any, specialDefaultFields: defaultTestData = {}) => {
	const _expects = expects as hasmethod;
	const _testTarget = testTarget as unknown as hasmethod;
	const defaultFields = { params: [], sentence: 'toEqual' };
	const {
		params: defaultParams,
		sentence: defaultSentence
	} = R.merge(
		defaultFields,
		specialDefaultFields
	);

	return R.forEach(({
		action,
		expected,
		params = defaultParams,
		sentence = defaultSentence,
	}: testData) => {
		test(action, () => {
			const result = _testTarget[action]
				.apply(_testTarget, params);

			_expects[sentence](result, expected);
		});
	});
};