import { VolunteerSystemModule } from './volunteer-system.module';

describe('VolunteerSystemModule', () => {
  let checkInModule: VolunteerSystemModule;

  beforeEach(() => {
    checkInModule = new VolunteerSystemModule();
  });

  it('should create an instance', () => {
    expect(checkInModule).toBeTruthy();
  });
});
