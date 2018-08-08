import { TeamsModule } from './teams.module';

describe('TeamsModule', () => {
  let userModule: TeamsModule;

  beforeEach(() => {
    userModule = new TeamsModule();
  });

  it('should create an instance', () => {
    expect(userModule).toBeTruthy();
  });
});
