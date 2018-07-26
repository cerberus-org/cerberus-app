import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { createMockMembers } from '../../../mocks/objects/member.mock';
import { createMockOrganizations } from '../../../mocks/objects/organization.mock';
import { createMockUserInfo } from '../../../mocks/objects/user.mock';
import { mockServiceProviders } from '../../../mocks/providers.mock';
import { mockStoreModules } from '../../../mocks/store.mock';
import * as ModelActions from '../../core/actions/model.actions';
import { SharedModule } from '../../shared/shared.module';
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
        SharedModule,
        ...mockStoreModules,
      ],
    });
    effects = TestBed.get(SessionEffects);
  }));

  describe('loadData$', () => {
    it('should dispatch SessionActions.LoadDataSuccess', (() => {
      const userInfo = createMockUserInfo()[0];
      const member = createMockMembers()[0];
      const organization = createMockOrganizations()[0];
      actions = hot('a', {
        a: new SessionActions.LoadData(userInfo),
      });
      const expected = cold('(bcdef)', {
        b: new SessionActions.LoadDataSuccess({
          userInfo,
          member,
          organization,
        }),
        c: new ModelActions.LoadMembers(member.organizationId),
        d: new ModelActions.LoadSites(member.organizationId),
        e: new ModelActions.LoadVisits(member.organizationId),
        f: new ModelActions.LoadVolunteers(member.organizationId),
      });
      expect(effects.loadData$).toBeObservable(expected);
    }));
  });
});
