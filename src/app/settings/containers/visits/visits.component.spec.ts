import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { createMockVisits } from '../../../mock/objects/visit.mock';
import { createMockVolunteers } from '../../../mock/objects/volunteer.mock';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import * as SettingsActions from '../../store/actions/settings.actions';
import { VisitsComponent } from './visits.component';

describe('RolesComponent', () => {
  let component: VisitsComponent;
  let fixture: ComponentFixture<VisitsComponent>;

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
});
