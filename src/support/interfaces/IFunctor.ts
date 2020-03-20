export interface IFunctor {
	map(f: Function): IFunctor;
}