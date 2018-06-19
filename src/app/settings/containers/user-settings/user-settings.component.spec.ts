import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { getTestUsers } from '../../../models';
import { reducers } from '../../../reducers';

import * as SettingsActions from '../../store/settings.actions';

import { UserSettingsComponent } from './user-settings.component';

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        UserSettingsComponent,
        MockComponent({ selector: 'app-user-form', inputs: ['initialUser', 'passwordRequired'] }),
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

  it('should handle userChanges events by setting userChanges', () => {
    component.onValidUser(getTestUsers()[0]);
    expect(component.userChanges).toEqual(getTestUsers()[0]);
  });

  it('should handle submitUser events by dispatching SettingsActions.UpdateUser', () => {
    spyOn(component.store, 'dispatch');
    const user = Object.assign({}, getTestUsers()[0], { firstName: 'Edited' });
    component.onSubmitUser(user);
    expect(component.store.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateUser(user));
  });
});
