export class ContainerBase<T> {
	public __value: T;

	constructor(x: T) {
		this.__value = x;
	}
}