import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { authReducers } from '../../../auth/store/reducers';
import { getMockUsers } from '../../../mock/objects/user.mock';
import { rootReducers } from '../../../root/store/reducers';
import * as SettingsActions from '../../store/actions/settings.actions';
import { UserSettingsComponent } from './user-settings.component';

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserSettingsComponent,
        MockComponent({ selector: 'app-user-form', inputs: ['initialUser', 'passwordRequired'] }),
      ],
      imports: [
        StoreModule.forRoot(rootReducers),
        StoreModule.forFeature('auth', authReducers),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle userEdits events by setting userEdits', () => {
    component.onValidUser(getMockUsers()[0]);
    expect(component.userEdits).toEqual(getMockUsers()[0]);
  });

  it('should handle submitUser events by dispatching SettingsActions.UpdateUser', () => {
    spyOn(component.store$, 'dispatch');
    const user = { ...getMockUsers()[0], firstName: 'Edited' };
    component.onSubmitUser(user);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateUser(user));
  });
});
