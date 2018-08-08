import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';
import { createMockSites } from '../../../../mocks/objects/site.mock';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { Site, Visit } from '../../models';
import { DailyHoursChartComponent } from './daily-hours-chart.component';

describe('DailyHoursChartComponent', () => {
  let component: DailyHoursChartComponent;
  let fixture: ComponentFixture<DailyHoursChartComponent>;
  let testLabels: string[];
  let sites: Site[];
  let visits: Visit[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
      ],
      declarations: [
        DailyHoursChartComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyHoursChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testLabels = ['Wed Jun 28', 'Thu Jun 29', 'Fri Jun 30', 'Sat Jul 1', 'Sun Jul 2'];
    sites = createMockSites();
    visits = createMockVisits();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set up the line chart labels', () => {
    const latest = createMockVisits()[4].startedAt;
    const labels = component.setupLineChartLabels(latest, 5, 'ddd MMM D', 'days');
    expect(labels.length).toEqual(5);
    labels.forEach((label, index) =>
      expect(label).toEqual(testLabels[index]));
  });

  it('should set up the line chart data for a data set', () => {
    const mapOfSites = new Map(
      sites.map<[string, string]>((site: Site) => [site.id, site.label]),
    );
    const lineChartData = component.setupLineChartDataForDataSet(createMockVisits(), testLabels, mapOfSites);
    expect(lineChartData.data.length).toEqual(5);
    expect(lineChartData.data[0]).toEqual('0.000');
    expect(lineChartData.data[1]).toEqual('10.000');
    expect(lineChartData.label).toEqual('Jefferson Parish Animal Shelter Hours');
  });
});
