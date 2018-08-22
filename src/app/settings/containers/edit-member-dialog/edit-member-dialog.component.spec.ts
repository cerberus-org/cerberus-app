import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { createMockMembers } from '../../../../mocks/objects/member.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { EditMemberDialogComponent } from './edit-member-dialog.component';

describe('EditMemberDialogComponent', () => {
  let component: EditMemberDialogComponent;
  let fixture: ComponentFixture<EditMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        MatSelectModule,
        ...mockStoreModules,
      ],
      declarations: [
        EditMemberDialogComponent,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            member: createMockMembers()[0],
            user: createMockMembers()[0],
          },
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
