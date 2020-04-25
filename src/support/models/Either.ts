import {
	IEither,
	ILeft,
	IRight,
	IFunctor,
	EitherType,
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
	implements ILeft<T>, IFunctor {

	static of<T>(x: T) {
		return new Left(x);
	}

	type = EitherType.Left;

	constructor(x: T) {
		super(x);
	}

	map(f: any) {
		return this;
	}

	join() {
		return this;
	}

	chain<X>(f: (x: T) => X) {
		return this;
	}

	ap(other: IFunctor) {
		return this;
	}

	inspect() {
		return `Left(${inspect(this.__value)})`
	}
}

export class Right<T> extends ContainerBase<T>
	implements IRight<T>, IFunctor {

	static of<T>(x: T) {
		return new Right(x);
	}

	type = EitherType.Right;

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
		return f(this.join());
	}
	ap(other: IFunctor) {
		return this.chain((f: T) => other.map(f as any as (x: any) => any));
	}

	inspect() {
		return `Left(${inspect(this.__value)})`
	}
}
