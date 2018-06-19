import { CheckInModule } from './check-in.module';

describe('CheckInModule', () => {
  let checkInModule: CheckInModule;

  beforeEach(() => {
    checkInModule = new CheckInModule();
  });

  it('should create an instance', () => {
    expect(checkInModule).toBeTruthy();
  });
});
