import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { createMockVisits } from '../../../mock/objects/visit.mock';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { rootReducers } from '../../../root/store/reducers';
import { DataDisplayComponent } from './data-display.component';

describe('DataDisplayComponent', () => {
  let component: DataDisplayComponent;
  let fixture: ComponentFixture<DataDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataDisplayComponent,
        MockComponent({ selector: 'app-daily-hours-chart', inputs: ['visits'] }),
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showDelete', 'getRowColor'],
        }),
      ],
      imports: [
        NoopAnimationsModule,
        MatIconModule,
        MatTabsModule,
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight active visits with the correct color', () => {
    expect(component.getVisitRowColor(createMockVisits()[3])).toEqual('#ccff99');
  });

  it('should not highlight completed visits', () => {
    expect(component.getVisitRowColor(createMockVisits()[0])).toEqual('');
  });
});
