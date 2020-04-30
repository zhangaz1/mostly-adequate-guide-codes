import R from 'ramda';

import {
	IFunctor,
	IIO,
	IShowable,
} from '../interfaces';

import { ContainerBase } from './ContainerBase';

export class IO<T extends () => X, X>
	implements IIO<T>, IShowable {

	static of<X>(x: X) {
		return new IO(() => x);
	}

	unsafePerformIO: T;

	constructor(x: T) {
		this.unsafePerformIO = x;
	}

	map<Y>(f: (x: X) => Y) {
		return new IO(R.compose(f, this.unsafePerformIO));
	}

	join() {
		return this.unsafePerformIO();
	}

	chain<Y>(f: (x: X) => Y) {
		return this.map(f).join();
	}

	ap(other: IFunctor) {
		return this.chain((x: X) => other.map(x as any as Function));
	}

	inspect() {
		return `IO(${this.unsafePerformIO})`;
	}
}

export function unsafePerformIO<T extends () => X, X>(io: IO<T, X>) {
	return io.unsafePerformIO();
}