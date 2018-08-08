import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { mockProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import * as fromTeams from '../../reducers';

import { JoinTeamDialogComponent } from './join-team-dialog.component';

describe('JoinTeamDialogComponent', () => {
  let component: JoinTeamDialogComponent;
  let fixture: ComponentFixture<JoinTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          teams: combineReducers(fromTeams.reducers),
        }),
      ],
      declarations: [
        JoinTeamDialogComponent,
        MockComponent({ selector: 'app-team-search' }),
      ],
      providers: mockProviders,
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
