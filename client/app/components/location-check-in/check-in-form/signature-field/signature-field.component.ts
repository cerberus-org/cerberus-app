import { Component, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature-field',
  templateUrl: './signature-field.component.html',
  styleUrls: ['./signature-field.component.css'],
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

  public options: Object = {
    'canvasWidth': 600,
    'canvasHeight': 200
  };

  public _signature: any = null;

  public propagateChange: Function = null;

  // ViewChild provides reference to signature pad in component view
  @ViewChild(SignaturePad)
  public signaturePad: SignaturePad;

  constructor() { }

  get signature(): any {
    return this._signature;
  }

  set signature(value: any) {
    this._signature = value;
    // modify form
    this.propagateChange(this.signature);
  }

  /**
   * Initialize value.
   *
   * @param value
   */
  public writeValue(value: any): void {
    if (!value || !this.signaturePad || !this._signature) {
      return;
    }
    this._signature = value;
    this.signaturePad.fromData(this.signature);
  }

  /**
   * Register 'fn' which will be fired when changes are mad
   * This is how changes are emitted back to the form.
   * @param fn
   */
  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  /**
   * Part of interface contract.
   */
  public registerOnTouched(): void {
    // no-op
  }

  /**
   * Called after view has been initialized.
   */
  public ngAfterView(): void {
    this.signaturePad.clear();
  }

  /**
   * After the user has finished drawing, save the signature as an array of point groups.
   */
  public drawComplete(): void {
    this.signature = this.signaturePad.toData();
  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }

  /**
   * Sets the signature to pre existing signature.
   * @param signature - the signature
   */
  public setSignatureToExistingSignature(signature): void {
    this.signature = this.signaturePad.fromData(signature);
  }
}
