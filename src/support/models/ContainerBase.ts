export class ContainerBase<T> {
	protected __value: T;

	constructor(x: T) {
		this.__value = x;
	}
}