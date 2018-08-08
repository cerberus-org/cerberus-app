import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { TeamSearchComponent } from './team-search.component';

describe('TeamSearchComponent', () => {
  let component: TeamSearchComponent;
  let fixture: ComponentFixture<TeamSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamSearchComponent],
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatIconModule,
        ...mockStoreModules,
        BrowserAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
