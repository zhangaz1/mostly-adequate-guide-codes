import {
	Maybe,
	liftA2,
	IO,
} from '../../support';

const Task = require('data.task');
import R from 'ramda';


// fib browser for test
const localStorage: any = {};



// Exercise 1
// ==========
// Write a function that add's two possibly null numbers together using Maybe and ap()

//  ex1 :: Number -> Number -> Maybe Number
const ex1 = function (x: number, y: number) {
	return Maybe.of(R.add).ap(Maybe.of(x)).ap(Maybe.of(y));
};


// Exercise 2
// ==========
// Now write a function that takes 2 Maybe's and adds them. Use liftA2 instead of ap().

//  ex2 :: Maybe Number -> Maybe Number -> Maybe Number
const ex2 = liftA2(R.add);


// Exercise 3
// ==========
// Run both getPost(n) and getComments(n) then render the page with both. (the n arg is arbitrary)
const makeComments = R.reduce(function (acc, c) { return acc + "<li>" + c + "</li>" }, "");
const render = R.curry(function (p, cs) { return "<div>" + p.title + "</div>" + makeComments(cs); });

const getPost = (i: number) => new Task((reject: any, resolve: any) => setTimeout(() => resolve({ id: i, title: 'Love them tasks' }), 300));
const getComments = (i: number) => new Task((reject: any, resolve: any) => setTimeout(() => resolve(['This book should be illegal', 'Monads are like space burritos']), 200));
//  ex3 :: Task Error HTML
const ex3 = Task.of(render).ap(getPost(2)).ap(getComments(2));
const ex31 = liftA2(render, getPost(2), getComments(2));



// Exercise 4
// ==========
// Write an IO that gets both player1 and player2 from the cache and starts the game
localStorage.player1 = "toby";
localStorage.player2 = "sally";

const getCache = function (x: any) {
	return new IO(function () { return localStorage[x]; });
}
const game = R.curry(function (p1, p2) { return p1 + ' vs ' + p2; });

//  ex4 :: IO String
const ex4 = liftA2(game, getCache('player1'), getCache('player2'));


export default {
	ex1,
	ex2,
	ex3,
	ex31,
	ex4,
};