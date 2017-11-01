import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMarginsComponent } from './side-margins.component';

describe('SideMarginsComponent', () => {
  let component: SideMarginsComponent;
  let fixture: ComponentFixture<SideMarginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMarginsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMarginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
