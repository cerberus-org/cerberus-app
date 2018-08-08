import { Component, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature-field',
  templateUrl: './signature-field.component.html',
  styleUrls: ['./signature-field.component.scss'],
  providers: [
    {
      // Since SignatureFieldComponent implements the ControlValueAccessor it is registered as a provider.
      provide: NG_VALUE_ACCESSOR,
      // Since classes that are referenced in the same file they are used are not hoisted, a foward reference is used.
      useExisting: forwardRef(() => SignatureFieldComponent),
      // A multi provider provides all the providers registered with NG_VALUE_ACCESSOR.
      multi: true,
    },
  ],
})
// Implement ControlValueAccessor so SignatureFieldComponent can be used on a form
export class SignatureFieldComponent implements ControlValueAccessor {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  options: Object = {
    canvasWidth: 600,
    canvasHeight: 200,
  };
  emitValueChanges: Function;

  constructor() {}

  /**
   * Used by formControl to set value to the native form control.
   *
   * @param value
   */
  writeValue(value: any): void {
    if (!this.signaturePad || !this.emitValueChanges) {
      return;
    }
    const arrayValue = value === null ? [] : value; // Use empty array if value is null
    this.signaturePad.fromData(arrayValue);
    this.emitValueChanges(arrayValue);
  }

  /**
   * Used by formControl to register a callback that is expected to be triggered every time the native form control is
   * updated. This is how changes are emitted back to the form.
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.emitValueChanges = fn;
  }

  registerOnTouched(): void {
    // Do nothing on blur
  }

  /**
   * Handles draw events by setting the signature to the converted data from the signature pad.
   */
  onDraw(): void {
    this.emitValueChanges(this.signaturePad.toData());
  }
}
