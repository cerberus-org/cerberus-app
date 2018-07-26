import { VolunteersModule } from './volunteers.module';

describe('VolunteersModule', () => {
  let checkInModule: VolunteersModule;

  beforeEach(() => {
    checkInModule = new VolunteersModule();
  });

  it('should create an instance', () => {
    expect(checkInModule).toBeTruthy();
  });
});
