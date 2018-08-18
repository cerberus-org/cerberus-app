import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { mockProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { ViewSelectedTeamComponent } from './view-selected-team.component';

describe('ViewSelectedTeamComponent', () => {
  let component: ViewSelectedTeamComponent;
  let fixture: ComponentFixture<ViewSelectedTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...mockStoreModules,
      ],
      declarations: [
        ViewSelectedTeamComponent,
        MockComponent({ selector: 'app-selected-team-toolbar', inputs: ['team', 'sites'] }),
        MockComponent({ selector: 'app-data-display', inputs: ['visits$', 'sites$'] }),
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
