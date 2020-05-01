import {
	Maybe,
	IO,
	Right,
	Left,
	chain,
} from '../../support';

var Task = require('data.task');
import R from 'ramda';

// Exercise 1
// ==========
// Use safeProp and map/join or chain to safely get the street name when given a user

interface ISafeProp {
	<T, K extends keyof T>(propName: K): ((obj: T) => Maybe<T[K]>);
}
interface ISafeProp2 {
	<K>(propName: K): (obj: [K]) => Maybe<any>;
}
const safeProp = R.curry(function <T, K extends keyof T>(x: K, o: T) {
	// return o[x];
	return Maybe.of(o[x]);
});


interface IStreet {
	number: number;
	name: string;
}

interface IAddress {
	street: IStreet;
}

interface IUser {
	id: number;
	name: string;
	address: IAddress;
}

const user: IUser = {
	id: 2,
	name: "albert",
	address: {
		street: {
			number: 22,
			name: 'Walnut St'
		}
	}
};

// const ex1 = R.compose<IUser, IAddress, IStreet, string>(
// 	(safeProp as any as ((key: string) => (obj: IStreet) => string))('name'),
// 	(safeProp as any as ((key: string) => (obj: IAddress) => IStreet))('street'),
// 	(safeProp as any as ((key: string) => (obj: IUser) => IAddress))('address')
// );// user.address.street.name;


const ex1 = R.compose(
	// @ts-ignore
	chain(safeProp('name')),
	// @ts-ignore
	chain(safeProp('street')),
	// @ts-ignore
	safeProp('address')
);

// Exercise 2
// ==========
// Use getFile to get the filename, remove the directory so it's just the file, then purely log it.

var getFile = function () {
	return new IO(function () { return __filename; });
}

var pureLog = function (x: any) {
	return new IO(function () {
		console.log(x);
		return 'logged ' + x; // for testing w/o mocks
	});
}

var ex2 = R.compose(chain(R.compose(pureLog, R.last, R.split('/'))), getFile);



// Exercise 3
// ==========
// Use getPost() then pass the post's id to getComments().

var getPost = function (i: any) {
	return new Task(function (rej: any, res: any) {
		setTimeout(function () {
			res({ id: i, title: 'Love them tasks' }); // THE POST
		}, 10);
	});
}

var getComments = function (i: any) {
	return new Task(function (rej: any, res: any) {
		setTimeout(function () {
			res([{ post_id: i, body: "This book should be illegal" }, { post_id: i, body: "Monads are like smelly shallots" }]);
		}, 10);
	});
}

// @ts-ignore
var ex3 = R.compose(chain(R.compose(getComments, R.prop('id'))), getPost);


// Exercise 4
// ==========
// Use validateEmail, addToMailingList and emailBlast to implement ex4's type signature.
// It should safely add a new subscriber to the list, then email everyone with this happy news.

//  addToMailingList :: Email -> IO [Email]
var addToMailingList = (function (list: any) {
	return function (email: any) {
		return new IO(function () {
			list.push(email);
			return list;
		});
	}
})([]);

//  emailBlast :: [Email] -> IO String
function emailBlast(list: any) {
	return new IO(function () {
		return 'emailed: ' + list.join(','); // for testing w/o mocks
	});
}

//  validateEmail :: Email -> Either String Email
var validateEmail = function (x: any) {
	return x.match(/\S+@\S+\.\S+/) ? (new Right(x)) : (new Left('invalid email'));
}

//  ex4 :: Email -> Either String (IO String)
// @ts-ignore
var ex4 = R.compose(R.map(R.compose(chain(emailBlast), addToMailingList)), validateEmail);

export default {
	ex1,
	ex2,
	ex3,
	ex4,
	user,
};
