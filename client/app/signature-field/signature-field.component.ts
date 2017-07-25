import { Component, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature-field',
  templateUrl: './signature-field.component.html',
  styleUrls: ['./signature-field.component.css'],
  providers: [
    {
      // provides a ControlValueAccessor for forms
      provide: NG_VALUE_ACCESSOR,
      // since classes that are referenced in the same file they are used are not hoisted, a foward reference is used
      useExisting: forwardRef(() => SignatureFieldComponent),
      // a multi provider passes all the providers registered with NG_VALUE_ACCESSOR
      multi: true,
    },
  ],
})
export class SignatureFieldComponent {

  public options: Object = {};

  public _signature: any = null;

  public propagateChange: Function = null;

  // provides reference to signature pad in component view
  @ViewChild(SignaturePad)
  public signaturePad: SignaturePad;

  constructor() { }

  get signature(): any {
    return this._signature;
  }

  set signature(value: any) {
    this._signature = value;
    console.log('set signature to ' + this._signature);
    console.log(this.signaturePad.toData());
    // ?
    this.propagateChange(this.signature);
  }

  public writeValue(value: any): void {
    if (!value) {
      return;
    }
    this._signature = value;
    this.signaturePad.fromDataURL(this.signature);
  }

  public registerOnTouched() {
    // no op
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public drawBegin(): void {
    console.log('Begin Drawing');
  }

  public drawComplete(): void {
    this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);
  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }
}
