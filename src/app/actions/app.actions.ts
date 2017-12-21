import { Action } from '@ngrx/store';

export const SET_PAGE_CONFIG = '[set_page_config] Set page config';

/**
 * Includes side nav options and header options.
 */
export class SetPageConfig implements Action {
  readonly type = SET_PAGE_CONFIG;

  constructor(public payload: any) {}
}

export type All
  = SetPageConfig;
