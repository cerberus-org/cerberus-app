import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';

import { VisitDataDisplayComponent } from './visit-data-display.component';

describe('VisitDataDisplayComponent', () => {
  let component: VisitDataDisplayComponent;
  let fixture: ComponentFixture<VisitDataDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MdTabsModule
      ],
      declarations: [
        VisitDataDisplayComponent,
        MockComponent({ selector: 'app-daily-hours-chart' }),
        MockComponent({ selector: 'app-visit-history-table' })
      ]
    })
    .compileComponents();
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
