import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    OrganizationFormComponent,
    UserFormComponent,
  ],
  exports: [
    OrganizationFormComponent,
    UserFormComponent,
  ],
})
export class SharedModule {
}
