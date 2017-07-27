import { Component, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature-field',
  templateUrl: './signature-field.component.html',
  styleUrls: ['./signature-field.component.css'],
  providers: [
    {
      // since SignatureFieldComponent implements the ControlValueAccessor it is registered as a provider
      provide: NG_VALUE_ACCESSOR,
      // since classes that are referenced in the same file they are used are not hoisted, a foward reference is used
      useExisting: forwardRef(() => SignatureFieldComponent),
      // a multi provider provides all the providers registered with NG_VALUE_ACCESSOR
      multi: true,
    },
  ],
})
// implement ControlValueAccessor so SignatureFieldComponent can be used on a form
export class SignatureFieldComponent implements ControlValueAccessor {

  public options: Object = {};

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
    // update form
    this.propagateChange(this.signature);
  }

  /**
   * Initialize value
   *
   * @param value
   */
  public writeValue(value: any): void {
    if (!value) {
      return;
    }
    this._signature = value;
    this.signaturePad.fromDataURL(this.signature);
  }

  /**
   * registers 'fn' which will be fired when changes are made
   * this is how changes are emitted back to the form
   * @param fn
   */
  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // part of interface contract
  public registerOnTouched(): void {
    // no-op
  }

  public AfterViewInit(): void {
    this.signaturePad.clear();
  }

  public drawComplete(): void {
    this.signature = this.signaturePad.toDataURL('image/jpeg', .5);
  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }
}
