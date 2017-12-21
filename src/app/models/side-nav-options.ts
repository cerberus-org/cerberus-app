import * as RouterActions from '../actions/router.actions';

export class SideNavOptions {
  labelToAction: Map<string, any>;

  constructor(labelToAction: Map<string, any>) {
    this.labelToAction = labelToAction;
  }
}

export const testSideNavOptions: SideNavOptions[] = [
  {
    labelToAction: new Map([
      ['User', new RouterActions.Go({ path: ['/user'] })],
      ['Home', new RouterActions.Go({ path: ['/dashboard'] })],
    ])
  }
];
