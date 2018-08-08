import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../material';

import { SelectedTeamToolbarComponent } from './selected-team-toolbar.component';

describe('SelectedTeamToolbarComponent', () => {
  let component: SelectedTeamToolbarComponent;
  let fixture: ComponentFixture<SelectedTeamToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [
        SelectedTeamToolbarComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTeamToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
