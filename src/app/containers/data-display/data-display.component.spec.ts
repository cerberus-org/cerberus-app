import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import { reducers } from '../../reducers/index';
import { DataDisplayComponent } from './data-display.component';

describe('DataDisplayComponent', () => {
  let component: DataDisplayComponent;
  let fixture: ComponentFixture<DataDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataDisplayComponent,
        MockComponent({ selector: 'app-daily-hours-chart', inputs: ['visits'] }),
        MockComponent({ selector: 'app-visit-history-table', inputs: ['columnOptions', 'data$'] })
      ],
      imports: [
        NoopAnimationsModule,
        MatTabsModule,
        StoreModule.forRoot(reducers)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
