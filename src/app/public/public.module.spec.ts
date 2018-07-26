import { PublicModule } from './public.module';

describe('PublicModule', () => {
  let publicDashboardModule: PublicModule;

  beforeEach(() => {
    publicDashboardModule = new PublicModule();
  });

  it('should create an instance', () => {
    expect(publicDashboardModule).toBeTruthy();
  });
});
