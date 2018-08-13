import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesAgreementComponent } from './services-agreement.component';

describe('ServicesAgreementComponent', () => {
  let component: ServicesAgreementComponent;
  let fixture: ComponentFixture<ServicesAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatCheckboxModule,
        MatTabsModule,
        NoopAnimationsModule,
      ],
      declarations: [ServicesAgreementComponent],
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
