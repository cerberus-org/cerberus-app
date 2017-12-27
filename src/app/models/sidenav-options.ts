import { Action } from '@ngrx/store';

export class SidenavOptions {
  label: string;
  action: Action;

  constructor(label: string, action: Action) {
    this.label = label;
    this.action = action;
  }
}

export const testSidenavOptions: SidenavOptions[] = [
  {
    label: 'Go',
    action: null,
  }
];
