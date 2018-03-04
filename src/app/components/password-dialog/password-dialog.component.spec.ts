import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PasswordDialogComponent } from './password-dialog.component';

class MatDialogRefMock {
  close() { }
}

describe('VerificationDialogComponent', () => {
  let component: PasswordDialogComponent;
  let fixture: ComponentFixture<PasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      declarations: [PasswordDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when confirmSelection is called', () => {
    spyOn(component.dialogRef, 'close');
    component.confirmSelection();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
