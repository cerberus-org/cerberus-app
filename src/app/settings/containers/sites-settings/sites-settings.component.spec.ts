import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatToolbarModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';
import { createMockSites } from '../../../../mocks/objects/site.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { Site } from '../../../shared/models';
import { RemoveSite } from '../../actions/settings.actions';
import { SitesSettingsComponent } from './sites-settings.component';

describe('SitesSettingsComponent', () => {
  let component: SitesSettingsComponent;
  let fixture: ComponentFixture<SitesSettingsComponent>;
  let sites: Site[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SitesSettingsComponent,
        MockComponent({ selector: 'app-data-table', inputs: ['data$', 'columnOptions', 'showRemove', 'showEdit', 'deleteRow', 'updateRow'] }),
      ],
      imports: [
        ...mockStoreModules,
        MatDialogModule,
        MatToolbarModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sites = createMockSites();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should handle onRemoveRow events by dispatching RemoveSite',
    () => {
      const site = sites[0];
      spyOn(component.store$, 'dispatch');
      component.onRemoveRow(site);
      expect(component.store$.dispatch).toHaveBeenCalledWith(
        new RemoveSite({ site }),
      );
    },
  );

  it('should display site names in the first table column', () => {
    const site = sites[0];
    expect(component.columnOptions[0].cell(site))
      .toEqual(site.name);
  });

  it('should display site addresses in the second table column', () => {
    const site = sites[0];
    expect(component.columnOptions[1].cell(site))
      .toEqual(site.address);
  });

  it('should display site descriptions in the third table column', () => {
    const site = sites[0];
    expect(component.columnOptions[2].cell(site))
      .toEqual(site.description);
  });
});
