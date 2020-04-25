import {
	IEither,
	ILeft,
	IRight,
	IFunctor,
} from '../interfaces';

import { ContainerBase } from './ContainerBase';

import { inspect } from '../../utils';

// Either
export class Either implements IEither {
	static of<T>(x: T) {
		return Right.of(x);
	}
};

export class Left<T> extends ContainerBase<T>
	implements ILeft, IFunctor {

	static of<T>(x: T) {
		return new Left(x);
	}

	constructor(x: T) {
		super(x);
	}

	map(f: any) {
		return this;
	}

	join() {
		return this;
	}

	chain() {
		return this;
	}

	ap(other: any) {
		return this;
	}

	inspect() {
		return `Left(${inspect(this.__value)})`
	}
}

export class Right<T> extends ContainerBase<T>
	implements IRight, IFunctor {

	static of<T>(x: T) {
		return new Right(x);
	}

	constructor(x: T) {
		super(x);
	}

	map<U>(f: (x: T) => U) {
		return Right.of(f(this.__value));
	}

	join() {
		return this.__value;
	}

	chain<X>(f: (x: T) => X) {
		return f(this.__value);
	}
	ap(other: IFunctor) {
		return this.chain((f: T) => other.map(f as any as Function));
	}

	inspect() {
		return `Left(${inspect(this.__value)})`
	}
}

export function either<T, U, X>(left: (x: T) => U, right: (x: T) => X) {
	return (e: Left<T> | Right<T>) => {
		switch (e.constructor) {
			case Left: return left(e.__value);
			case Right: return right(e.__value);
		}
	};
}