import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTeamDialogComponent } from './join-team-dialog.component';

describe('JoinTeamDialogComponent', () => {
  let component: JoinTeamDialogComponent;
  let fixture: ComponentFixture<JoinTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinTeamDialogComponent ]
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
