import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { DataModule } from '../../../data/data.module';
import { mockOrganizations } from '../../../mock/objects/organization.mock';
import { getMockUsers, mockFirebaseUsers } from '../../../mock/objects/user.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { SharedModule } from '../../../shared/shared.module';
import { AuthModule } from '../../auth.module';
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
        AuthModule,
        DataModule,
        SharedModule,
      ],
    });
    effects = TestBed.get(SessionEffects);
  }));

  describe('loadData$', () => {
    it('should dispatch SessionActions.LoadDataSuccess', (() => {
      actions = hot('a', {
        a: new SessionActions.LoadData(mockFirebaseUsers[0]),
      });
      const expected = cold('b', {
        b: new SessionActions.LoadDataSuccess({
          user: getMockUsers()[0],
          organization: mockOrganizations[0],
        }),
      });
      expect(effects.loadData$).toBeObservable(expected);
    }));
  });
});
