import {
	IOf,
	IIdentity,
} from '../interfaces';

import { inspect } from '../../utils';
import { ContainerBase } from './ContainerBase';



// Identity
class IdentityClass<T> extends ContainerBase<T>
	implements IIdentity<T> {

	static of<T>(x: T) {
		return new Identity(x);
	}

	constructor(x: T) {
		super(x);
	}

	map(f: (x: T) => T) {
		return Identity.of(f(this.value));
	}

	inspect() {
		return `Identity(${inspect(this.value)})`;
	}
}

export const Identity: IOf<T, IdentityClass<T>> = IdentityClass;