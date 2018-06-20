import { PublicDashboardModule } from './public-dashboard.module';

describe('PublicDashboardModule', () => {
  let publicDashboardModule: PublicDashboardModule;

  beforeEach(() => {
    publicDashboardModule = new PublicDashboardModule();
  });

  it('should create an instance', () => {
    expect(publicDashboardModule).toBeTruthy();
  });
});
