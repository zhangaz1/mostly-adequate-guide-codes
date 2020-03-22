import R from 'ramda';

import {
	IFunctor,
	IIO,
	IShowable,
} from '../interfaces';

import { ContainerBase } from './ContainerBase';

export class IO<T extends () => X, X> extends ContainerBase<T>
	implements IIO<T>, IShowable {

	static of<X>(x: X) {
		return new IO(() => x);
	}

	public get unsafePerformIO() {
		return this.__value;
	}

	constructor(x: T) {
		super(x);
	}

	map<Y>(f: (x: X) => Y) {
		return new IO(R.compose(f, this.unsafePerformIO));
	}

	join() {
		return this.unsafePerformIO();
	}

	chain<Y>(f: (x: X) => Y) {
		this.map(f).join();
	}

	ap(other: IFunctor) {
		return this.chain((x: X) => other.map(x as any as Function));
	}

	inspect() {
		return `IO(${this.unsafePerformIO})`;
	}
}
