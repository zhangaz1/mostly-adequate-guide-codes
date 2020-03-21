const Task = require('data.task');

import R from 'ramda';

import { trace } from '../../../src/utils';

import {
	Maybe,
	Left,
	Right,
} from '../../support';

// Exercise 1
// ==========
// Use _.add(x,y) and _.map(f,x) to make a function that increments a value inside a functor

const ex1 = R.map(R.add(1));



// Exercise 2
// ==========
// Use _.head to get the first element of the list

const ex2 = R.map(R.head);



// Exercise 3
// ==========
// Use safeProp and _.head to find the first initial of the user
const safeProp = R.curry(function (x, o) {
	return Maybe.of(o[x]);
});
const head = R.map(R.head) as any as ((x: Maybe<string>) => Maybe<string>);
const ex3 = R.compose(head, safeProp('name'));



// Exercise 4
// ==========
// Use Maybe to rewrite ex4 without an if statement

// const ex4 = function (n: string): undefined | number {
// 	if (n) {
// 		return parseInt(n);
// 	}
// };
const mapParseInt = R.map(parseInt) as any as ((x: Maybe<string>) => Maybe<number>);
const ex4 = R.compose<string, Maybe<string>, Maybe<number>>(mapParseInt, Maybe.of);



// Exercise 5
// ==========
// Write a function that will getPost then _.toUpper the post's title

// getPost :: Int -> Future({id: Int, title: String})
const getPost = function (i: number) {
	return new Task(function (rej: Function, res: Function) {
		setTimeout(function () {
			res({ id: i, title: 'Love them futures' })
		}, 300)
	});
};

const getUpperTitle = R.compose<any, string, string>(R.toUpper, R.prop('title'));
const ex5 = R.compose<number, typeof Task, typeof Task>(R.map(getUpperTitle), getPost);



// Exercise 6
// ==========
// Write a function that uses checkActive() and showWelcome() to grant access or return the error

const showWelcome = R.compose<any, string, string>(R.concat('Welcome '), R.prop('name'));

const checkActive = function (user: { name: string, active: boolean }) {
	return user.active ? Right.of(user) : Left.of('Your account is not active')
};

const ex6 = undefined;



// // Exercise 7
// // ==========
// // Write a validation function that checks for a length > 3. It should return Right(x) if it is greater than 3 and Left("You need > 3") otherwise

// var ex7 = function (x) {
// 	return undefined; // <--- write me. (don't be pointfree)
// };



// // Exercise 8
// // ==========
// // Use ex7 above and Either as a functor to save the user if they are valid or return the error message string. Remember either's two arguments must return the same type.

// var save = function (x) {
// 	return new IO(function () {
// 		console.log("SAVED USER!");
// 		return x + '-saved';
// 	});
// };

// var ex8 = undefined;

// module.exports = { ex1: ex1, ex2: ex2, ex3: ex3, ex4: ex4, ex5: ex5, ex6: ex6, ex7: ex7, ex8: ex8 };

export default {
	ex1,
	ex2,
	ex3,
	ex4,
	ex5,
	ex6,
};