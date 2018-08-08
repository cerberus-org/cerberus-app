import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { SelectedTeamToolbarComponent } from './components/selected-team-toolbar/selected-team-toolbar.component';
import { CreateTeamDialogComponent } from './containers/create-team-dialog/create-team-dialog.component';
import { JoinTeamDialogComponent } from './containers/join-team-dialog/join-team-dialog.component';
import { TeamsPageComponent } from './containers/teams-page/teams-page.component';
import { ViewSelectedTeamComponent } from './containers/view-selected-team/view-selected-team.component';
import { TeamsPageEffects } from './effects/teams-page.effects';
import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    TeamsRoutingModule,

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([TeamsPageEffects]),
  ],
  declarations: [
    TeamsPageComponent,
    CreateTeamDialogComponent,
    JoinTeamDialogComponent,
    ViewSelectedTeamComponent,
    SelectedTeamToolbarComponent,
  ],
  entryComponents: [
    CreateTeamDialogComponent,
    JoinTeamDialogComponent,
  ],
})
export class TeamsModule {
}
