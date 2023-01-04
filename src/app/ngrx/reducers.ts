import {Action, State} from '@ngrx/store';
import {SetBreed, SetLimit} from './actions';
import {defer} from "rxjs";
import {IBreed} from "../interfaces/breed";

export const initialState = {id: '', name: ''};

export function breedReducer(state = initialState, action: SetBreed): IBreed {
  switch (action.type) {
    case '[Cat Component] SetBreed':
      return {
        id: action.payload.id,
        name: action.payload.name
      };

    default:
      return state;
  }
}

export const initialLimitState = 10;

export function limitReducer(state = initialLimitState, action: SetLimit): number {
  switch (action.type) {
    case '[Cat Component] SetLimit':
      return action.payload;

    default:
      return state;
  }
}
