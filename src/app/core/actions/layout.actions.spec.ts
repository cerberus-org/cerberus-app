import { createMockHeaderOptions } from '../../../mocks/objects/header-options.mock';
import { createMockSidenavOptions } from '../../../mocks/objects/sidenav-options.mock';
import { LayoutActionTypes, SetHeaderOptions, SetSidenavOptions } from './layout.actions';

describe('layout.actions', () => {
  it('should create a SetHeaderOptions action', () => {
    const payload = createMockHeaderOptions()[0];
    expect({ ...new SetHeaderOptions(payload) }).toEqual({
      payload,
      type: LayoutActionTypes.SetHeaderOptions,
    });
  });
  it('should create a SetSidenavOptions action', () => {
    const payload = createMockSidenavOptions();
    expect({ ...new SetSidenavOptions(payload) }).toEqual({
      payload,
      type: LayoutActionTypes.SetSidenavOptions,
    });
  });
});
