import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule, MatDialogRef, MatTabsModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PolicyDialogComponent } from './policy-dialog.component';

class MatDialogRefMock {
  close() { }
}

describe('PolicyDialogComponent', () => {
  let component: PolicyDialogComponent;
  let fixture: ComponentFixture<PolicyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      declarations: [PolicyDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyDialogComponent);
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
