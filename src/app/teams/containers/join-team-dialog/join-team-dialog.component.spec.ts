import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';

import { mockProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { JoinTeamDialogComponent } from './join-team-dialog.component';

describe('JoinTeamDialogComponent', () => {
  let component: JoinTeamDialogComponent;
  let fixture: ComponentFixture<JoinTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...mockStoreModules,
        MatDialogModule,
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
