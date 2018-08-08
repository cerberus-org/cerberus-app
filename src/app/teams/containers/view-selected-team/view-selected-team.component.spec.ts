import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { mockProviders } from '../../../../mocks/providers.mock';
import * as fromTeams from '../../reducers';

import { ViewSelectedTeamComponent } from './view-selected-team.component';

describe('ViewSelectedTeamComponent', () => {
  let component: ViewSelectedTeamComponent;
  let fixture: ComponentFixture<ViewSelectedTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          teams: combineReducers(fromTeams.reducers),
        }),
      ],
      declarations: [
        ViewSelectedTeamComponent,
        MockComponent({ selector: 'app-selected-team-toolbar', inputs: ['team'] }),
        MockComponent({ selector: 'app-data-display', inputs: ['visits$'] }),
      ],
      providers: mockProviders,
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSelectedTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
