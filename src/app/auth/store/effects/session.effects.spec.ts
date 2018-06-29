import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { DataModule } from '../../../data/data.module';
import { createMockMembers } from '../../../mock/objects/member.mock';
import { createMockOrganizations } from '../../../mock/objects/organization.mock';
import { createMockUsers } from '../../../mock/objects/user.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { SharedModule } from '../../../shared/shared.module';
import * as SessionActions from '../actions/session.actions';
import { SessionEffects } from './session.effects';

describe('SessionEffects', () => {
  let effects: SessionEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    actions = of('');
    TestBed.configureTestingModule({
      providers: [
        SessionEffects,
        provideMockActions(() => actions),
        ...mockServiceProviders,
      ],
      imports: [
        DataModule,
        SharedModule,
        ...mockStoreModules,
      ],
    });
    effects = TestBed.get(SessionEffects);
  }));

  describe('loadData$', () => {
    it('should dispatch SessionActions.LoadDataSuccess', (() => {
      const userInfo = createMockUsers()[0];
      actions = hot('a', {
        a: new SessionActions.LoadData(userInfo),
      });
      const expected = cold('b', {
        b: new SessionActions.LoadDataSuccess({
          userInfo,
          member: createMockMembers()[0],
          organization: createMockOrganizations()[0],
        }),
      });
      expect(effects.loadData$).toBeObservable(expected);
    }));
  });
});
