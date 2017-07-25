import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureFieldComponent } from './signature-field.component';

describe('SignatureFieldComponent', () => {
  let component: SignatureFieldComponent;
  let fixture: ComponentFixture<SignatureFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
