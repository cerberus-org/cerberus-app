import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectedTeamComponent } from './view-selected-team.component';

describe('ViewSelectedTeamComponent', () => {
  let component: ViewSelectedTeamComponent;
  let fixture: ComponentFixture<ViewSelectedTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSelectedTeamComponent ]
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
