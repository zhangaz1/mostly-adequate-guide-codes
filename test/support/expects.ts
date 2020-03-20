export default {
	toBe: (expected: any, actual: any) => expect(actual).toBe(expected),
	toEqual: (expected: any, actual: any) => expect(actual).toEqual(expected),
	// deepEqual: (expected: any, actual: any) => expect(actual).deepEqual(expected),
};