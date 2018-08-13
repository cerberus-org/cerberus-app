import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmailDialogComponent } from './email-dialog.component';

describe('ForgotPwdDialogComponent', () => {
  let component: EmailDialogComponent;
  let fixture: ComponentFixture<EmailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailDialogComponent],
      imports: [
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MatDialogRefMock {
  close() {}
}
