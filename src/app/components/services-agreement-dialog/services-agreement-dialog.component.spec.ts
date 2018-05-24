import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule, MatDialogRef, MatTabsModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesAgreementDialogComponent } from './services-agreement-dialog.component';

class MatDialogRefMock {
  close() { }
}

describe('PolicyDialogComponent', () => {
  let component: ServicesAgreementDialogComponent;
  let fixture: ComponentFixture<ServicesAgreementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      declarations: [ServicesAgreementDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAgreementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when close is called', () => {
    spyOn(component.dialogRef, 'close');
    component.close();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
