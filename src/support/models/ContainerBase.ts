import { IContainer } from '../interfaces';

export class ContainerBase<T> implements IContainer<T> {
	protected __value: T;

	constructor(x: T) {
		this.__value = x;
	}

	get value() {
		return this.__value;
	}
}