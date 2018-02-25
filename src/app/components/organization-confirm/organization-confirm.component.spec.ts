import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatListModule } from '@angular/material';

import { OrganizationConfirmComponent } from './components';

describe('OrganizationConfirmComponent', () => {
  let component: OrganizationConfirmComponent;
  let fixture: ComponentFixture<OrganizationConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationConfirmComponent],
      imports: [
        MatIconModule,
        MatListModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
