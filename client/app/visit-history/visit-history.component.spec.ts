import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { VisitHistoryComponent } from './visit-history.component';
import Volunteer from '../shared/volunteer';
import Visit from '../shared/visit';

describe('VisitHistoryComponent', () => {
  let component: VisitHistoryComponent;
  let fixture: ComponentFixture<VisitHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisitHistoryComponent],
      imports: [
        MaterialModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitHistoryComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getVisits').and.callFake(() => {
      return testVisits;
    });
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create a key for each unique date', () => {
    component.ngOnInit();
    expect(component.dates.length).toEqual(2);
    expect(component.dates).toEqual([
      testVisits[0].startedAt.toDateString(),
      testVisits[2].startedAt.toDateString()
    ]);
  });

  it('should map the visits to the correct date key', () => {
    component.ngOnInit();
    expect(component.visitsByDate.get(component.dates[0])).toEqual([
      testVisits[0],
      testVisits[1]
    ]);
    expect(component.visitsByDate.get(component.dates[1])).toEqual([
      testVisits[2]
    ]);
  });

  it('should format times properly', () => {
    const formatted = component.formatTime(testVisits[0].startedAt);
    expect(formatted).toEqual('5:45 AM')
  });

  it('should format durations properly', () => {
    const formatted = component.formatDuration(testVisits[0]);
    expect(formatted).toEqual('6 hours, 0 minutes')

  });

  const testVolunteer: Volunteer = {
    firstName: 'Ted',
    lastName: 'Mader',
    petName: 'Mimi'
  };

  const testVisits: Visit[] = [
    {
      volunteer: testVolunteer,
      startedAt: new Date('2017-06-29T10:45:02.336Z'),
      endedAt: new Date('2017-06-29T16:45:56.336Z')
    },
    {
      volunteer: testVolunteer,
      startedAt: new Date('2017-06-29T12:45:42.336Z'),
      endedAt: new Date('2017-06-29T18:45:01.336Z')
    },
    {
      volunteer: testVolunteer,
      startedAt: new Date('2017-06-30T12:45:32.336Z'),
      endedAt: new Date('2017-06-30T18:45:52.336Z')
    }
  ];
});
