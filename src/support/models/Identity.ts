import {
	IIdentity,
} from '../interfaces';

import { inspect } from '../../utils';
import { ContainerBase } from './ContainerBase';

// Identity
export class Identity<T> extends ContainerBase<T>
	implements IIdentity<T> {
	static of<T>(x: T) {
		return new Identity(x);
	}

	constructor(x: T) {
		super(x);
	}

	public map<U>(f: (x: T) => T): Identity<T> {
		return Identity.of(f(this.__value));
	}

	public inspect() {
		return `Identity(${inspect(this.__value)})`;
	}
}
