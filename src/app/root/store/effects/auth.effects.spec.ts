import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AuthModule } from '../../../auth/auth.module';
import { DataModule } from '../../../data/data.module';
import { mockOrganizations } from '../../../mock/objects/organization.mock';
import { getMockUsers, mockFirebaseUsers } from '../../../mock/objects/user.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { SharedModule } from '../../../shared/shared.module';
import * as AuthActions from '../actions/auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    actions = of('');
    TestBed.configureTestingModule({
      imports: [
        AuthModule,
        DataModule,
        SharedModule,
      ],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        ...mockServiceProviders,
      ],
    });
    effects = TestBed.get(AuthEffects);
  }));

  describe('loadData$', () => {
    it('should dispatch AuthActions.LoadDataSuccess', (() => {
      actions = hot('a', {
        a: new AuthActions.LoadData(mockFirebaseUsers[0]),
      });
      const expected = cold('b', {
        b: new AuthActions.LoadDataSuccess({
          user: getMockUsers()[0],
          organization: mockOrganizations[0],
        }),
      });
      expect(effects.loadData$).toBeObservable(expected);
    }));
  });
});
