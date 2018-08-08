import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { getUserInfo } from '../../auth/selectors/session.selectors';
import { HeaderOptions, SidenavOptions } from '../../shared/models';
import { LayoutReducerState } from '../reducers/layout.reducer';

export const selectLayoutReducerState = createFeatureSelector<LayoutReducerState>('layout');

export const selectHeaderOptions = createSelector(
  selectLayoutReducerState,
  (state: LayoutReducerState): HeaderOptions => state.headerOptions,
);

export const selectSidenavOptions = createSelector(
  selectLayoutReducerState,
  (state: LayoutReducerState): SidenavOptions[] => state.sidenavOptions,
);

export const selectSidenavOpened = createSelector(
  selectLayoutReducerState,
  (state: LayoutReducerState): boolean => state.sidenavOpened,
);

export interface HeaderState extends HeaderOptions {
  showLogOut: boolean;
  showToggleSidenav: boolean;
}

export const selectHeaderState = createSelector(
  selectHeaderOptions,
  selectSidenavOptions,
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

export const selectSidenavState = createSelector(
  selectSidenavOptions,
  selectSidenavOpened,
  (sidenavOptions: SidenavOptions[], sidenavOpened: boolean): SidenavState => ({
    options: sidenavOptions,
    opened: sidenavOpened,
  }),
);
