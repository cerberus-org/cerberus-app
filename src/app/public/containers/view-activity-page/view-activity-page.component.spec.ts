import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { ViewActivityPageComponent } from './view-activity-page.component';

describe('ViewActivityPageComponent', () => {
  let component: ViewActivityPageComponent;
  let fixture: ComponentFixture<ViewActivityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewActivityPageComponent,
        MockComponent({ selector: 'app-data-display', inputs: ['visits$', 'sites$'] }),
      ],
      imports: [
        ...mockStoreModules,
      ],
      providers: [
        ...mockProviders,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
