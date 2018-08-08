import { MembersEffects } from './members.effects';
import { ModelEffects } from './model.effects';
import { RouterEffects } from './router.effects';
import { SitesEffects } from './sites.effects';
import { TeamsEffects } from './teams.effects';
import { VisitsEffects } from './visits.effects';
import { VolunteersEffects } from './volunteers.effects';

export const appEffects: any[] = [
  ModelEffects,
  RouterEffects,
  TeamsEffects,
  MembersEffects,
  SitesEffects,
  VisitsEffects,
  VolunteersEffects,
];
