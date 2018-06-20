import { AuthService, MockAuthService } from '../auth/services/auth.service';
import { MockOrganizationService, OrganizationService } from '../data/services/organization.service';
import { MockSiteService, SiteService } from '../data/services/site.service';
import { MockUserService, UserService } from '../data/services/user.service';
import { MockVisitService, VisitService } from '../data/services/visit.service';
import { MockVolunteerService, VolunteerService } from '../data/services/volunteer.service';
import { CsvService, MockCsvService } from '../settings/services/csv.service';
import { ErrorService, MockErrorService } from '../shared/services/error.service';
import { MockSnackBarService, SnackBarService } from '../shared/services/snack-bar.service';

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
