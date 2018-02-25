import { Action } from '@ngrx/store';

export class SidenavOptions {
  label: string;
  icon: string;
  action: Action;

  constructor(label: string, icon: string, action: Action) {
    this.label = label;
    this.icon = icon;
    this.action = action;
  }
}

export const testSidenavOptions: SidenavOptions[] = [
  {
    label: 'Go',
    icon: 'forward',
    action: null,
  },
];
