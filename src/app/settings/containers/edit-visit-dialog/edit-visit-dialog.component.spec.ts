import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { createMockSites } from '../../../../mocks/objects/site.mock';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../../mocks/objects/volunteer.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { EditVisitDialogComponent } from './edit-visit-dialog.component';

describe('EditVisitDialogComponent', () => {
  let component: EditVisitDialogComponent;
  let fixture: ComponentFixture<EditVisitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        ...mockStoreModules,
      ],
      declarations: [EditVisitDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            ...createMockVisits()[0],
            volunteer: createMockVolunteers()[0],
            site: createMockSites()[0],
          },
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
