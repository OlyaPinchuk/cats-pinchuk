
import { Action } from '@ngrx/store';
import {IBreed} from "../interfaces/breed";

export class SetBreed implements Action {
  readonly type = '[Cat Component] SetBreed';
  constructor (public payload: IBreed) {};
}

export class SetLimit implements Action {
  readonly type = '[Cat Component] SetLimit';
  constructor(public payload: number) {};
}
