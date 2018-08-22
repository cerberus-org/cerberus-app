import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';
import { mockProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';

import { SignUpDialogComponent } from './sign-up-dialog.component';

describe('SignUpDialogComponent', () => {
  let component: SignUpDialogComponent;
  let fixture: ComponentFixture<SignUpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ...mockStoreModules,
      ],
      declarations: [
        SignUpDialogComponent,
        MockComponent({ selector: 'app-credentials-form' }),
        MockComponent({ selector: 'app-user-form' }),
      ],
      providers: mockProviders,
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
