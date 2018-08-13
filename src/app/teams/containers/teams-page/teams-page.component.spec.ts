import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { mockStoreModules } from '../../../../mocks/store.mock';
import { MaterialModule } from '../../../material';
import { TeamsPageComponent } from './teams-page.component';

describe('TeamsPageComponent', () => {
  let component: TeamsPageComponent;
  let fixture: ComponentFixture<TeamsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ...mockStoreModules,
      ],
      declarations: [
        TeamsPageComponent,
        MockComponent({ selector: 'app-view-selected-team' }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
