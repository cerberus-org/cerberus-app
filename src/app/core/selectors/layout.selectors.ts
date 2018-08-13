import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { getUserInfo } from '../../auth/selectors/auth.selectors';
import { HeaderOptions, SidenavOptions } from '../../shared/models';
import { LayoutReducerState } from '../reducers/layout.reducer';

export const getLayoutReducerState = createFeatureSelector<LayoutReducerState>('layout');

export const getHeaderOptions = createSelector(
  getLayoutReducerState,
  (state: LayoutReducerState): HeaderOptions => state.headerOptions,
);

export const getSidenavOptions = createSelector(
  getLayoutReducerState,
  (state: LayoutReducerState): SidenavOptions[] => state.sidenavOptions,
);

export const getSidenavOpened = createSelector(
  getLayoutReducerState,
  (state: LayoutReducerState): boolean => state.sidenavOpened,
);

export interface HeaderState extends HeaderOptions {
  showLogOut: boolean;
  showToggleSidenav: boolean;
}

export const getHeaderState = createSelector(
  getHeaderOptions,
  getSidenavOptions,
  getUserInfo,
  (
    headerOptions: HeaderOptions,
    sidenavOptions: SidenavOptions[],
    userInfo: UserInfo,
  ): HeaderState => !!headerOptions
    ? ({
      ...headerOptions,
      showLogOut: !!userInfo && headerOptions.showLogOut,
      showToggleSidenav: !!sidenavOptions,
    })
    : null,
);

export interface SidenavState {
  options: SidenavOptions[];
  opened: boolean;
}

export const getSidenavState = createSelector(
  getSidenavOptions,
  getSidenavOpened,
  (sidenavOptions: SidenavOptions[], sidenavOpened: boolean): SidenavState => ({
    options: sidenavOptions,
    opened: sidenavOpened,
  }),
);
