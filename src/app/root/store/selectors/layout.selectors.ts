import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { selectSessionUserInfo } from '../../../auth/store/selectors/session.selectors';
import { HeaderOptions, SidenavOptions } from '../../../models';
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
  selectSessionUserInfo,
  (headerOptions: HeaderOptions, sidenavOptions: SidenavOptions[], userInfo: UserInfo): HeaderState => ({
    ...headerOptions,
    showLogOut: !!userInfo,
    showToggleSidenav: !!sidenavOptions,
  }),
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
