import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../../mocks/objects/volunteer.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import {
  convertToTimeString,
  formatDate,
  formatDuration,
  formatTime,
  formatTimeInputValue,
  getFullName,
} from '../../../shared/helpers';
import { VisitWithVolunteer } from '../../../shared/models/visit-with-volunteer';
import * as SettingsActions from '../../actions/settings.actions';
import { VisitsComponent } from './visits.component';

describe('Visits Component', () => {
  let component: VisitsComponent;
  let fixture: ComponentFixture<VisitsComponent>;
  let visitWithVoluneer: VisitWithVolunteer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VisitsComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showDelete', 'getRowColor', 'isEditable'],
        }),
      ],
      imports: [
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsComponent);
    component = fixture.componentInstance;
    visitWithVoluneer = {
      ...createMockVisits()[0],
      volunteer: createMockVolunteers()[0],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should handle onUpdateVisits events by dispatching SettingsActions.UpdateVisits',
    () => {
      const visits = createMockVisits();
      const volunteers = createMockVolunteers();
      const visitsWithVolunteers = [Object.assign(visits[0], { volunteer: volunteers[0] })];
      spyOn(component.store$, 'dispatch');
      component.onUpdateVisits(visitsWithVolunteers);
      expect(component.store$.dispatch).toHaveBeenCalledWith(
        new SettingsActions.UpdateVisits(visitsWithVolunteers),
      );
    },
  );

  it('should display the firstName and lastName of a volunteer in the first table column', () => {
    expect(component.columnOptions[0].cell(visitWithVoluneer))
      .toEqual(getFullName(visitWithVoluneer.volunteer));
  });

  it('should display formatted date in the second table column', () => {
    expect(component.columnOptions[1].cell(visitWithVoluneer))
      .toEqual(formatDate(visitWithVoluneer.startedAt, visitWithVoluneer.timezone));
  });

  it('should display formatted time for start date in the third table column', () => {
    expect(component.columnOptions[2].cell(visitWithVoluneer))
      .toEqual(formatTime(visitWithVoluneer.startedAt, visitWithVoluneer.timezone));
  });

  describe('endedAt column option', () => {

    it('should display formatted time for input of type time for endedAt in the fourth table column', () => {
      expect(component.columnOptions[3].cell(visitWithVoluneer))
        .toEqual(formatTimeInputValue(visitWithVoluneer.endedAt, visitWithVoluneer.timezone));
    });

    it('should update visit with time when updateItemWithTime is called', () => {
      expect(convertToTimeString(component.columnOptions[3].timePicker.updateItemWithTime('3:00', visitWithVoluneer, visitWithVoluneer.timezone).endedAt))
        .toEqual('03:00');
    });

    it('should return false when validator is called and startedAt is after endedAt', () => {
      expect(component.columnOptions[3].validator(visitWithVoluneer))
        .toEqual(true);
    });
  });

  it('should display duration of visit fifth table column', () => {
    expect(component.columnOptions[4].cell(visitWithVoluneer))
      .toEqual(formatDuration(visitWithVoluneer.startedAt, visitWithVoluneer.endedAt, visitWithVoluneer.timezone));
  });
});
