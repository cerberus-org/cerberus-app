import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export enum RouterActionTypes {
  Go = '[router] go',
  Back = '[router] back',
  Forward = '[router] forward',
}

export class Go implements Action {
  readonly type = RouterActionTypes.Go;

  constructor(public payload: {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  }) {}
}

export class Back implements Action {
  readonly type = RouterActionTypes.Back;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.Forward;
}
