import R from 'ramda';
import accounting from 'accounting';

interface Car {
	name: string,
	horsepower: number,
	dollar_value: number,
	in_stock: boolean,
};

// Example Data
const CARS: Car[] = [
	{ name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
	{ name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
	{ name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
	{ name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
	{ name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
	{ name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
];

// Exercise 1:
// ============
// use _.compose() to rewrite the function below. Hint: _.prop() is curried.
// const isLastInStock = function (cars: []) {
// 	var reversed_cars = R.last(cars) as unknown as car;
// 	return R.prop('in_stock')(reversed_cars);
// };
const isLastInStock = R.compose(R.prop('in_stock'), R.last);

// // Exercise 2:
// // ============
// // use _.compose(), _.prop() and _.head() to retrieve the name of the first car
const nameOfFirstCar = R.compose(R.prop('name'), R.head);


// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition
const _average = function (xs: number[]) { return R.reduce(R.add, 0, xs) / xs.length; }; // <- leave be

// const averageDollarValue = function (cars: car[]) {
// 	var dollar_values = R.map(function (c) { return c.dollar_value; }, cars);
// 	return _average(dollar_values);
// };

const averageDollarValue = R.compose(_average, R.map(R.prop('dollar_value')));

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that takes an array of cars and returns a list of lowercase and underscored names: e.g: sanitizeNames([{name: "Ferrari FF"}]) //=> ["ferrari_ff"].

const _underscore = R.replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize

const sanitizeNames = R.map(
	R.compose<Car, string, string, string>(
		_underscore,
		R.toLower,
		R.prop('name')
	)
);


// Bonus 1:
// ============
// Refactor availablePrices with compose.

// const availablePrices = function (cars: any[]) {
// 	var available_cars = R.filter(R.prop('in_stock'), cars);
// 	return available_cars.map(function (x) {
// 		return accounting.formatMoney(x.dollar_value)
// 	}).join(', ');
// };

const availablePrices = R.compose<Car[], Car[], number[], string[], string>(
	R.join(', '),
	R.map<number, string>(accounting.formatMoney),
	R.pluck('dollar_value'),
	R.filter(R.prop('in_stock'))
);

// // Bonus 2:
// // ============
// // Refactor to pointfree. Hint: you can use _.flip()

// const fastestCar = function (cars: car[]) {
// 	var sorted = R.sortBy(function (car) { return car.horsepower }, cars);
// 	var fastest = R.last(sorted);
// 	return fastest?.name + ' is the fastest';
// };
const append = R.flip(R.concat);
const fastestCar = R.compose<Car[], Car[], Car, string, string>(
	append(' is the fastest'),
	R.prop('name'),
	R.last,
	R.sortBy(R.prop('horsepower'))
);

// module.exports = { CARS: CARS,
//                    isLastInStock: isLastInStock,
//                    nameOfFirstCar: nameOfFirstCar,
//                    fastestCar: fastestCar,
//                    averageDollarValue: averageDollarValue,
//                    availablePrices: availablePrices,
//                    sanitizeNames: sanitizeNames
//                  };

export default {
	CARS,
	isLastInStock,
	nameOfFirstCar,
	averageDollarValue,
	sanitizeNames,
	availablePrices,
	fastestCar,
};