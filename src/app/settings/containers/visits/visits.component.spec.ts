import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material';
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
  let visitWithVolunteer: VisitWithVolunteer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VisitsComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showDelete', 'validItemsEdited', 'invalidItemsEdited', 'getCellFontColor', 'getCellFontWeight'],
        }),
      ],
      imports: [
        MatToolbarModule,
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsComponent);
    component = fixture.componentInstance;
    visitWithVolunteer = {
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
      const visitsWithVolunteers = [visitWithVolunteer];
      spyOn(component.store$, 'dispatch');
      component.onUpdateVisits(visitsWithVolunteers);
      expect(component.store$.dispatch).toHaveBeenCalledWith(
        new SettingsActions.UpdateVisits(visitsWithVolunteers),
      );
    },
  );

  it(
    'should handle onUpdateVisit events by calling updateVisitEndedAtWithTime and then addVisitToEditedList',
    () => {
      spyOn(component, 'updateVisitEndedAtWithTime');
      spyOn(component, 'addVisitToEditedList');
      component.onUpdateVisit({ time: '3:00', visit: visitWithVolunteer });
      expect(component.updateVisitEndedAtWithTime).toHaveBeenCalled();
      expect(component.addVisitToEditedList).toHaveBeenCalled();
    },
  );

  it(
    'should return true if isVisitValid is called and startedAt is before endedAt',
    () => {
      expect(component.isVisitValid(visitWithVolunteer)).toEqual(true);
    },
  );

  it(
    'should return visit with updated endedAt date when is updateVisitEndedAtWithTime called',
    () => {
      expect(convertToTimeString(component.updateVisitEndedAtWithTime('3:00', visitWithVolunteer).endedAt.toString())).toEqual('03:00');
    },
  );

  it('should not set cell font-color to red if visit is valid', () => {
    expect(component.getCellFontColor(visitWithVolunteer, [])).toEqual('');
  });

  it('should set cell font-color to red if visit is not valid', () => {
    expect(component.getCellFontColor(visitWithVolunteer, [visitWithVolunteer])).toEqual('#f44336');
  });

  it('should not set cell font-weight to bold if visit is not edited', () => {
    expect(component.getCellFontWeight(visitWithVolunteer, [], [])).toEqual('');
  });

  it('should set cell font-weight to bold if visit is edited', () => {
    expect(component.getCellFontWeight(visitWithVolunteer, [], [visitWithVolunteer])).toEqual('bold');
  });

  describe('addVisitToEditedList', () => {
    it('should add visit to validVisitsEdited when called', () => {
      component.validVisitsEdited = [];
      component.addVisitToEditedList(visitWithVolunteer);
      expect(component.validVisitsEdited).toEqual([visitWithVolunteer]);
    });

    it('should add visit to invalidVisitsEdited when called', () => {
      component.invalidVisitsEdited = [];
      const invalidVisit = component.updateVisitEndedAtWithTime('01:00', visitWithVolunteer);
      component.addVisitToEditedList(invalidVisit);
      expect(component.invalidVisitsEdited).toEqual([invalidVisit]);
    });

    it(
      'should remove pre-exiting valid visit from validVisitsEdited when called with a valid visit that has the same id',
      () => {
        component.validVisitsEdited = [visitWithVolunteer];
        const validVisitToAdd = component.updateVisitEndedAtWithTime('08:00', visitWithVolunteer);
        component.addVisitToEditedList(validVisitToAdd);
        expect(component.validVisitsEdited.length).toEqual(1);
      },
    );

    it(
      'should remove pre-exiting invalid visit from invalidVisitsEdited when called with an invalid visit that has the same id',
      () => {
        component.invalidVisitsEdited = [visitWithVolunteer];
        const invalidVisitToAdd = component.updateVisitEndedAtWithTime('18:00', visitWithVolunteer);
        component.addVisitToEditedList(invalidVisitToAdd);
        expect(component.validVisitsEdited.length).toEqual(1);
      },
    );
  });

  describe('column options', () => {
    it('should display the firstName and lastName of a volunteer in the first table column', () => {
      expect(component.columnOptions[0].cell(visitWithVolunteer))
        .toEqual(getFullName(visitWithVolunteer.volunteer));
    });

    it('should display formatted date in the second table column', () => {
      expect(component.columnOptions[1].cell(visitWithVolunteer))
        .toEqual(formatDate(visitWithVolunteer.startedAt, visitWithVolunteer.timezone));
    });

    it('should display formatted time for start date in the third table column', () => {
      expect(component.columnOptions[2].cell(visitWithVolunteer))
        .toEqual(formatTime(visitWithVolunteer.startedAt, visitWithVolunteer.timezone));
    });

    it('should display duration of visit fifth table column', () => {
      expect(component.columnOptions[4].cell(visitWithVolunteer))
        .toEqual(formatDuration(visitWithVolunteer.startedAt, visitWithVolunteer.endedAt, visitWithVolunteer.timezone));
    });

    it('should display formatted time for input of type time for endedAt in the fourth table column', () => {
      expect(component.columnOptions[3].cell(visitWithVolunteer))
        .toEqual(formatTimeInputValue(visitWithVolunteer.endedAt, visitWithVolunteer.timezone));
    });
  });
});
