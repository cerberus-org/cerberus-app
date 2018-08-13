import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';

import { CreateTeamDialogComponent } from './create-team-dialog.component';

describe('CreateTeamDialogComponent', () => {
  let component: CreateTeamDialogComponent;
  let fixture: ComponentFixture<CreateTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...mockStoreModules,
      ],
      declarations: [
        CreateTeamDialogComponent,
        MockComponent({ selector: 'app-team-form' }),
      ],
      providers: mockProviders,
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
