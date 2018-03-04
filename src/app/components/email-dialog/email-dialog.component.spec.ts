import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwdDialogComponent } from './email-dialog.component';

describe('ForgotPwdDialogComponent', () => {
  let component: ForgotPwdDialogComponent;
  let fixture: ComponentFixture<ForgotPwdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
