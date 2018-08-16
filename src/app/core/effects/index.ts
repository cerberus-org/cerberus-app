import { MembersEffects } from './members.effects';
import { ProfilesEffects } from './profiles.effects';
import { RouterEffects } from './router.effects';
import { SitesEffects } from './sites.effects';
import { TeamsEffects } from './teams.effects';
import { VisitsEffects } from './visits.effects';
import { VolunteersEffects } from './volunteers.effects';

export const appEffects: any[] = [
  RouterEffects,
  TeamsEffects,
  MembersEffects,
  ProfilesEffects,
  SitesEffects,
  VisitsEffects,
  VolunteersEffects,
];
