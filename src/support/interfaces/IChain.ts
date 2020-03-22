import { IJoin } from './IJoin';

export interface IChain<T> extends IJoin<T> {
	chain<U>(f: (x: T) => U): U;
}