import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatToolbarModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';
import { createMockSites } from '../../../../mocks/objects/site.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { Site } from '../../../shared/models';
import { DeleteSite } from '../../actions/settings.actions';
import { SiteSettingsComponent } from './site-settings.component';

describe('SiteSettingsComponent', () => {
  let component: SiteSettingsComponent;
  let fixture: ComponentFixture<SiteSettingsComponent>;
  let sites: Site[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SiteSettingsComponent,
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
    fixture = TestBed.createComponent(SiteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sites = createMockSites();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should handle onRemoveRow events by dispatching DeleteSite',
    () => {
      const site = sites[0];
      spyOn(component.store$, 'dispatch');
      component.onRemoveRow(site);
      expect(component.store$.dispatch).toHaveBeenCalledWith(
        new DeleteSite({ site }),
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
