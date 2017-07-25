import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePageComponent } from './signature-page.component';

describe('SignaturePageComponent', () => {
  let component: SignaturePageComponent;
  let fixture: ComponentFixture<SignaturePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignaturePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
