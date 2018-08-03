import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatFormFieldModule, MatIconModule,
  MatInputModule, MatSelectModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { VisitDialogComponent } from './visit-dialog.component';

class MatDialogRefMock {
  close() { }
}

class MatDialogDataMock {
}

describe('VisitDialogComponent', () => {
  let component: VisitDialogComponent;
  let fixture: ComponentFixture<VisitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...mockStoreModules,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      declarations: [VisitDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide : MAT_DIALOG_DATA, useClass: MatDialogDataMock },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
