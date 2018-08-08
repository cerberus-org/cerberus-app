import { createMockHeaderOptions } from '../../../mocks/objects/header-options.mock';
import { createMockSidenavOptions } from '../../../mocks/objects/sidenav-options.mock';
import { LayoutActionTypes, SetHeaderOptions, SetSidenavOptions } from './layout.actions';

describe('layout.actions', () => {
  it('should create a SetHeaderOptions action', () => {
    const headerOptions = createMockHeaderOptions()[0];
    expect({ ...new SetHeaderOptions({ headerOptions }) }).toEqual({
      headerOptions,
      type: LayoutActionTypes.SetHeaderOptions,
    });
  });
  it('should create a SetSidenavOptions action', () => {
    const sidenavOptions = createMockSidenavOptions();
    expect({ ...new SetSidenavOptions({ sidenavOptions }) }).toEqual({
      sidenavOptions,
      type: LayoutActionTypes.SetSidenavOptions,
    });
  });
});
