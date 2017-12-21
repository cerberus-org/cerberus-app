import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { VerificationDialogComponent } from './verification-dialog.component';

describe('VerificationDialogComponent', () => {
  let component: VerificationDialogComponent;
  let fixture: ComponentFixture<VerificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDialogModule
      ],
      declarations: [VerificationDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDialogComponent);
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

class MatDialogRefMock {
  close() { }
}
