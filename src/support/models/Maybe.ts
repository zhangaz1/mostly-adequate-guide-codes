import {
	IMaybe,
} from '../interfaces';

import { inspect } from '../../utils';
import { ContainerBase } from './ContainerBase';

// Maybe
export class Maybe<T> extends ContainerBase<T>
	implements IMaybe<T> {

	static of<T>(x: T) {
		return new Maybe(x);
	}

	constructor(x: T) {
		super(x);
	}

	isNothing() {
		return this.__value === null
			|| this.__value === undefined;
	}

	map<U>(f: (x: T) => U): Maybe<U> {
		return this.isNothing()
			? Maybe.of(null as any as U)
			: Maybe.of(f(this.__value));
	}

	join(): Maybe<null> | T {
		return this.isNothing()
			? Maybe.of(null)
			: this.__value;
	}

	chain<U>(f: (x: T) => U) {
		return this.map(f).join();
	}

	ap<U, X>(other: Maybe<U>): Maybe<null | X> {
		return this.isNothing()
			? Maybe.of(null)
			: other.map(this.__value as any as (x: U) => X);
	}

	inspect() {
		return `Maybe(${inspect(this.__value)})`;
	}
}
