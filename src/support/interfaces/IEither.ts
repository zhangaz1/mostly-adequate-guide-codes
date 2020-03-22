import { IFunctor } from "./IFunctor";
import { IShowable } from "./IShowable";

export interface IEither { }

export interface ILeft extends IFunctor, IShowable { }

export interface IRight extends IFunctor, IShowable { }