import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitHistoryComponent } from './visit-history.component';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VisitHistoryComponent', () => {
  let component: VisitHistoryComponent;
  let fixture: ComponentFixture<VisitHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitHistoryComponent ],
      imports: [
        MaterialModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
