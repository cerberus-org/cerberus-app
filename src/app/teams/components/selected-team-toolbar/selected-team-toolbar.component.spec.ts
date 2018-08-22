import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SelectedTeamToolbarComponent } from './selected-team-toolbar.component';

describe('SelectedTeamToolbarComponent', () => {
  let component: SelectedTeamToolbarComponent;
  let fixture: ComponentFixture<SelectedTeamToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDividerModule,
        MatSelectModule,
        MatToolbarModule,
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
