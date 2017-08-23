import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';

import { VisitDataDisplayComponent } from './visit-data-display.component';

describe('VisitDataDisplayComponent', () => {
  let component: VisitDataDisplayComponent;
  let fixture: ComponentFixture<VisitDataDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VisitDataDisplayComponent,
        MockComponent({ selector: 'app-daily-hours-chart' }),
        MockComponent({ selector: 'app-visit-history-table' })
      ],
      imports: [
        NoopAnimationsModule,
        MdTabsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
