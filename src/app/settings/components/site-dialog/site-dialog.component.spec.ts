import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { SiteDialogComponent } from './site-dialog.component';

class MatDialogRefMock {
  close() {}
}

class MatDialogDataMock {}

describe('SiteDialogComponent', () => {
  let component: SiteDialogComponent;
  let fixture: ComponentFixture<SiteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...mockStoreModules,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      declarations: [SiteDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide : MAT_DIALOG_DATA, useClass: MatDialogDataMock },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
