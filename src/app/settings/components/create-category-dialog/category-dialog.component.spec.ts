import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {CreateCategoryDialogComponent} from "./category-dialog.component";

class MatDialogRefMock {
  close() { }
}

describe('VerificationDialogComponent', () => {
  let component: CreateCategoryDialogComponent;
  let fixture: ComponentFixture<CreateCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      declarations: [CreateCategoryDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when confirmSelection is called', () => {
    spyOn(component.dialogRef, 'close');
    component.close();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
