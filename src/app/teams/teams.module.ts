import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { TeamsPageComponent } from './containers/teams-page/teams-page.component';
import { TeamsEffects } from './effects/teams.effects';
import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    TeamsRoutingModule,
    EffectsModule.forFeature([TeamsEffects]),
  ],
  declarations: [TeamsPageComponent],
})
export class TeamsModule {
}
