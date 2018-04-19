import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { SignatureFieldComponent } from '../signature-field/signature-field.component';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
})
export class TermsOfServiceComponent implements OnInit {

  formGroup: FormGroup;
  @ViewChildren(SignatureFieldComponent) signatures: QueryList<SignatureFieldComponent>;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      terms: [''],
      signatureField: ['', Validators.required],
    });
  }

  clearSignature(): void {
    if (this.signatures.first) {
      this.signatures.first.clear();
    }
  }

}
