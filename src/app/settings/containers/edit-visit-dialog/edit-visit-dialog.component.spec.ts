import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createMockSites } from '../../../../mocks/objects/site.mock';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../../mocks/objects/volunteer.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { EditVisitDialogComponent } from './edit-visit-dialog.component';

class MatDialogRefMock {
  close() {}
}

class MatDialogDataMock {}

describe('EditVisitDialogComponent', () => {
  let component: EditVisitDialogComponent;
  let fixture: ComponentFixture<EditVisitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...mockStoreModules,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      declarations: [EditVisitDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide : MAT_DIALOG_DATA, useClass: MatDialogDataMock },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.data = {
      ...createMockVisits()[0],
      volunteer: createMockVolunteers()[0],
      teamSites: createMockSites(),
      selectedSite: createMockSites()[0],
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
