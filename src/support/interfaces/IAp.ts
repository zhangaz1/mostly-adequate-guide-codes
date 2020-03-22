import { IFunctor, IFunctor1 } from './IFunctor';
import { IChain } from './IChain';

export interface IAp<T> extends IChain<T> {
	ap(x: IFunctor): IFunctor;
}