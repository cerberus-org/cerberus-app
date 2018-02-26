import { AuthService, MockAuthService } from './auth.service';
import { CsvService, MockCsvService } from './csv.service';
import { ErrorService, MockErrorService } from './error.service';
import { MockOrganizationService, OrganizationService } from './organization.service';
import { MockSiteService, SiteService } from './site.service';
import { MockSnackBarService, SnackBarService } from './snack-bar.service';
import { MockUserService, UserService } from './user.service';
import { MockVisitService, VisitService } from './visit.service';
import { MockVolunteerService, VolunteerService } from './volunteer.service';

export const mockServiceProviders = [
  { provide: AuthService, useClass: MockAuthService },
  { provide: CsvService, useClass: MockCsvService },
  { provide: ErrorService, useClass: MockErrorService },
  { provide: OrganizationService, useClass: MockOrganizationService },
  { provide: SiteService, useClass: MockSiteService },
  { provide: SnackBarService, useClass: MockSnackBarService },
  { provide: UserService, useClass: MockUserService },
  { provide: VisitService, useClass: MockVisitService },
  { provide: VolunteerService, useClass: MockVolunteerService },
];
