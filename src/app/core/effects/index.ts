import { MembersEffects } from './members.effects';
import { ModelEffects } from './model.effects';
import { RouterEffects } from './router.effects';
import { TeamsEffects } from './teams.effects';

export const appEffects: any[] = [
  ModelEffects,
  RouterEffects,
  TeamsEffects,
  MembersEffects,
];
