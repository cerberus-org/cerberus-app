import { MembersEffects } from './members.effects';
import { RouterEffects } from './router.effects';
import { SitesEffects } from './sites.effects';
import { TeamsEffects } from './teams.effects';
import { UsersEffects } from './users.effects';
import { VisitsEffects } from './visits.effects';
import { VolunteersEffects } from './volunteers.effects';

export const appEffects: any[] = [
  RouterEffects,
  TeamsEffects,
  MembersEffects,
  UsersEffects,
  SitesEffects,
  VisitsEffects,
  VolunteersEffects,
];
