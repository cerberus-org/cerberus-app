import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule, MatCheckboxModule } from '@angular/material';
import { ServicesAgreementComponent } from './services-agreement.component';

describe('ServicesAgreementComponent', () => {
  let component: ServicesAgreementComponent;
  let fixture: ComponentFixture<ServicesAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesAgreementComponent],
      imports: [
        MatCardModule,
        MatCheckboxModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
