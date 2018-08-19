import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberDialogComponent } from './edit-member-dialog.component';

describe('EditMemberDialogComponent', () => {
  let component: EditMemberDialogComponent;
  let fixture: ComponentFixture<EditMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMemberDialogComponent ]
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
