import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureFieldComponent } from './signature-field.component';

describe('SignatureFieldComponent', () => {
  let component: SignatureFieldComponent;
  let fixture: ComponentFixture<SignatureFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignatureFieldComponent],
      imports: [
        ReactiveFormsModule,
        SignaturePadModule,
      ],
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

  it('should handle draw events by emitting the value changes', () => {
    component.emitValueChanges = jasmine.createSpy();
    const signaturePad = fixture.debugElement.query(By.css('signature-pad'));
    signaturePad.triggerEventHandler('onEndEvent', {});
    expect(component.emitValueChanges).toHaveBeenCalled();
  });

  it('should set the signature pad data and emit value changes when writeValue() is called', () => {
    component.emitValueChanges = jasmine.createSpy();
    const fromData = spyOn(component.signaturePad, 'fromData');
    const value = ['test'];
    component.writeValue(value);
    expect(component.emitValueChanges).toHaveBeenCalledWith(value);
    expect(fromData).toHaveBeenCalledWith(value);
  });

  it('should set the signature pad data and emit value changes using an empty array when writeValue() is called with a null value', () => {
    component.emitValueChanges = jasmine.createSpy();
    const fromData = spyOn(component.signaturePad, 'fromData');
    component.writeValue(null);
    expect(component.emitValueChanges).toHaveBeenCalledWith([]);
    expect(fromData).toHaveBeenCalledWith([]);
  });

  it('should register a callback to emit value changes', () => {
    const fn = () => {};
    component.registerOnChange(fn);
    expect(component.emitValueChanges).toBe(fn);
  });
});
