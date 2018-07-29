import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { TeamsPageComponent } from './containers/teams-page/teams-page.component';
import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    TeamsRoutingModule,
  ],
  declarations: [TeamsPageComponent],
})
export class TeamsModule {
}
