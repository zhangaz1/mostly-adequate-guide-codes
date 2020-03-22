export interface IFunctor {
	map(f: Function): IFunctor;
}

export interface IFunctor1<T> extends IFunctor {
	map(f: (x: T) => T): IFunctor1<T>;
	map<U>(f: (x: T) => U): IFunctor1<U>;
}