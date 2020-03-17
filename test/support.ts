import R from 'ramda';

export interface hasmethod {
	[index: string]: Function,
};

export interface testData {
	action: string,
	expected: any,
	params?: any[],
	sentence?: string,
};

export const expects = {
	toEqual: (expected: any, actual: any) => expect(actual).toEqual(expected),
	toBe: (expected: any, actual: any) => expect(actual).toBe(expected),
};

export const runTests = (testTarget: any, defaultParams: any[] = []) => {
	const _expects = expects as hasmethod;
	const _testTarget = testTarget as unknown as hasmethod;

	return R.forEach(({
		action,
		expected,
		params = defaultParams,
		sentence = 'toBe',
	}: testData) => {
		test(action, () => {
			const result = _testTarget[action]
				.apply(testTarget, params);
			_expects[sentence](result, expected);
		});
	});
};