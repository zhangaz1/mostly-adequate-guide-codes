import R from 'ramda';

// export * from './IContainer';
// export * from './IFunctor';
// export * from './IShowable';

// export * from './IIdentity';


// export * from './IJoin';
// export * from './IChain';
// export * from './IAp';

// export * from './IMaybe';

// export * from './IEither';

// export * from './IIO';


/*-----------------------------------------------------------------------------
 *  IContainer<T>
 *---------------------------------------------------------------------------*/
export interface IContainer<T> {
	readonly value: T;
}

/*-----------------------------------------------------------------------------
 *  IShowable
 *---------------------------------------------------------------------------*/
export interface IShowable {
	inspect(): string;
}

/*-----------------------------------------------------------------------------
 *  IFunctor, IFunctor1
 *---------------------------------------------------------------------------*/
export interface IFunctor {
	map(f: (x: any) => any): IFunctor;
}

export interface IFunctor1<T> extends IContainer<T>, IFunctor {
	map<U>(f: (x: T) => U): IFunctor1<U>;
	map(f: (x: T) => T): IFunctor1<T>;
	map(f: Function): IFunctor1<T>;
	// map(f: Function): IFunctor1<null>;
}

export const map = R.curry(<T, U>(f: (x: T) => U, m: IFunctor1<T>): IFunctor1<U> => m.map(f));


/*-----------------------------------------------------------------------------
 *  IOf
 *---------------------------------------------------------------------------*/
export interface IOf<T, U> {
	new(x: T): U;
	// of(x: T): IFunctor1<T>;
	of<X>(x: X): IFunctor1<X>;
}


/*-----------------------------------------------------------------------------
 *  IIdentity<T>
 *---------------------------------------------------------------------------*/
export interface IIdentity<T> extends IFunctor1<T>, IShowable { }


/*-----------------------------------------------------------------------------
 *  IJoin<T>/ICahin<T>/IAp<T>
 *---------------------------------------------------------------------------*/
export interface IJoin<T> extends IFunctor1<T> {
	join(): T;
	join(): IJoin<T>;
}
export const join = <T>(o: IJoin<T>) => o.join();


export interface IChain<T> extends IJoin<T> {
	chain<U>(f: (x: T) => U): U | IChain<T> | IChain<null>;
}
export const chain = R.curry(<T, U>(f: ((x: T) => U), m: IChain<T>) => m.chain(f));


export interface IAp<T> extends IChain<T> {
	ap(x: IFunctor): IFunctor;
}

/*-----------------------------------------------------------------------------
 *  IMaybe<T>
 *---------------------------------------------------------------------------*/
export interface IMaybe<T> extends IAp<T>, IFunctor1<T>, IShowable { }



/*-----------------------------------------------------------------------------
 *  IIO
 *---------------------------------------------------------------------------*/
export interface IIO<T> extends IFunctor, IShowable {

}


/*-----------------------------------------------------------------------------
 *  IEither
 *---------------------------------------------------------------------------*/

export enum EitherType {
	Left,
	Right,
}

export interface IEither {
}

export interface IEitherType {
	type: EitherType;
}

export interface IJoinLeft<T> {
	join(): IJoinLeft<T>;
}

export interface IChainLeft<T> extends IJoinLeft<T> {
	chain<U>(f: (x: T) => U): IChainLeft<T>;
}

export interface IApLeft<T> extends IChainLeft<T> {
	ap(x: IFunctor): IApLeft<T>;
}

export interface ILeft<T> extends IEitherType, IApLeft<T>, IShowable {
	readonly value: T;
}

export interface IJoinRight<T> {
	join(): T;
}

export interface IChainRight<T> extends IJoinRight<T> {
	chain<U>(f: (x: T) => U): U;
}

export interface IApRight<T> extends IChainRight<T> {
	ap(x: IFunctor): IFunctor;
}

export interface IRight<T> extends IEitherType, IApRight<T>, IShowable {
	readonly value: T;
}

export const either = <T, U>(f: (x: T) => U, g: (x: T) => U, m: ILeft<T> | IRight<T>) => {
	switch (m.type) {
		case EitherType.Left: return f(m.value);
		case EitherType.Right: return m.chain(g);
	}
};