import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatToolbarModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';
import { createMockSites } from '../../../../mocks/objects/site.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { Site } from '../../../shared/models';
import * as SettingsActions from '../../actions/settings.actions';
import { SiteSettingsComponent } from './site-settings.component';

describe('SiteSettingsComponent', () => {
  let component: SiteSettingsComponent;
  let fixture: ComponentFixture<SiteSettingsComponent>;
  let sites: Site[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SiteSettingsComponent,
        MockComponent({ selector: 'app-data-table', inputs: ['data$', 'columnOptions', 'showDelete', 'showEdit', 'deleteItem', 'updateItem'] }),
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
    'should handle onDeleteSite events by dispatching SettingsActions.DeleteSite',
    () => {
      spyOn(component.store$, 'dispatch');
      component.onDeleteSite(sites[0]);
      expect(component.store$.dispatch).toHaveBeenCalledWith(
        new SettingsActions.DeleteSite(sites[0]),
      );
    },
  );

  it('should display the label of a site in the first table column', () => {
    expect(component.columnOptions[0].cell(sites[0]))
      .toEqual(sites[0].label);
  });

  it('should display the description of a site in the second table column', () => {
    expect(component.columnOptions[1].cell(sites[0]))
      .toEqual(sites[0].description);
  });
});
