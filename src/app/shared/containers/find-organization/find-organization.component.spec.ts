import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../root/store/reducers';
import { FindOrganizationComponent } from './find-organization.component';

describe('FindOrganizationComponent', () => {
  let component: FindOrganizationComponent;
  let fixture: ComponentFixture<FindOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatIconModule,
        StoreModule.forRoot(reducers),
        BrowserAnimationsModule,
      ],
      declarations: [FindOrganizationComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
