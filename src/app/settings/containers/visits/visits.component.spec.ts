import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { VisitsComponent } from './visits.component';
import {mockReports} from "../../../mock/objects/report.mock";
import * as SettingsActions from "../../store/actions/settings.actions";
import {mockVisits} from "../../../mock/objects/visit.mock";

describe('RolesComponent', () => {
  let component: VisitsComponent;
  let fixture: ComponentFixture<VisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VisitsComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showDelete', 'getRowColor', 'isReadOnly'],
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
      spyOn(component.store$, 'dispatch');
      component.onUpdateVisits(mockVisits);
      expect(component.store$.dispatch).toHaveBeenCalledWith(
        new SettingsActions.UpdateVisits(mockVisits),
      );
    },
  );
});
