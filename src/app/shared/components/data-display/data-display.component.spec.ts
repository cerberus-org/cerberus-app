import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTabsModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { mockStoreModules } from '../../../../mocks/store-modules.mock';
import { Visit } from '../../models';
import { DataDisplayComponent } from './data-display.component';

describe('DataDisplayComponent', () => {
  let component: DataDisplayComponent;
  let fixture: ComponentFixture<DataDisplayComponent>;
  let visits: Visit[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataDisplayComponent,
        MockComponent({ selector: 'app-daily-hours-chart', inputs: ['visits'] }),
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showDelete', 'getRowColor'],
        }),
        MockComponent({ selector: 'app-loader' }),
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
    visits = createMockVisits();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  const getLoader = () => fixture.debugElement.query(By.css('#data-display-loader'));
  const getTabGroup = () => fixture.debugElement.query(By.css('#data-display-tab-group'));

  it('should initially display a loader', async(() => {
    expect(getLoader()).toBeTruthy();
    expect(getTabGroup()).toBeNull();
  }));

  it('should hide the loader after 350ms and display the tab group', (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(getLoader()).toBeNull();
      expect(getTabGroup()).toBeTruthy();
      done();
    });
  });

  // TODO: Find a way to spy on imported functions
  it('should display the formatted date of a visit in the first table column', () => {
    expect(component.visitTableColumnOptions[0].cell(visits[0]))
      .toEqual('Thursday, June 29');
  });

  it('should display the formatted start time of a visit in the second table column', () => {
    expect(component.visitTableColumnOptions[1].cell(visits[0]))
      .toEqual('5:45 AM');
  });

  it('should display the formatted end time of a visit in the third table column', () => {
    expect(component.visitTableColumnOptions[2].cell(visits[0]))
      .toEqual('9:45 AM');
  });

  it('should display the formatted duration of a visit in the fourth table column', () => {
    expect(component.visitTableColumnOptions[3].cell(visits[0]))
      .toEqual('4 hours');
  });

  it('should highlight active visits with the correct color', () => {
    expect(component.getVisitRowColor(visits[3])).toEqual('#ccff99');
  });

  it('should not highlight completed visits', () => {
    expect(component.getVisitRowColor(visits[0])).toEqual('');
  });
});
