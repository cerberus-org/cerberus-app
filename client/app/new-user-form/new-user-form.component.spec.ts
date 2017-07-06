import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewUserFormComponent } from './new-user-form.component';
// modules
import { RouterTestingModule } from '@angular/router/testing';
// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdAutocompleteModule, MdInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';
// volunteer service
import { HttpModule } from '@angular/http';

describe('NewUserFormComponent', () => {
  let component: NewUserFormComponent;
  let fixture: ComponentFixture<NewUserFormComponent>;

  let emptyForm = {
    firstName: null,
    lastName: null,
    petName: null
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserFormComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MdAutocompleteModule,
        MdInputModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
      ]
    })
    .compileComponents()
  }));

  beforeEach(async (() => {
    fixture = TestBed.createComponent(NewUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form should clear on submit', (() => {
    component.addVolunteer();
    expect(component.newUserForm.value).toEqual(emptyForm);
  }));
});
