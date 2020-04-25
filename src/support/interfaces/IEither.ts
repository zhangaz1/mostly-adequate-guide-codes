// import { IFunctor } from "./IFunctor";
// import { IShowable } from "./IShowable";
// import { IJoin } from './IJoin';
// import { IAp } from './IAp';

// export enum EitherType {
// 	Left,
// 	Right,
// }

// export interface IEither {
// }

// export interface IEitherType {
// 	type: EitherType;
// }

// export interface IJoinLeft<T> {
// 	join(): IJoinLeft<T>;
// }

// export interface IChainLeft<T> extends IJoinLeft<T> {
// 	chain<U>(f: (x: T) => U): IChainLeft<T>;
// }

// export interface IApLeft<T> extends IChainLeft<T> {
// 	ap(x: IFunctor): IApLeft<T>;
// }

// export interface ILeft<T> extends IEitherType, IApLeft<T>, IShowable { }

// export interface IRight<T> extends IEitherType, IAp<T>, IShowable { }

// export const either = <T, U>(f: (x: T) => U, g, m: ILeft<T> | IRight<T>) => {
// 	switch (m.type) {
// 		case EitherType.Left: return f(m.getValue);
// 		case EitherType.Right: return m.chain(g);
// 	}
// };