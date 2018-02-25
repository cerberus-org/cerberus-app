import { AuthService, MockAuthService } from '../services/auth.service';
import { CsvService, MockCsvService } from '../services/csv.service';
import { ErrorService, MockErrorService } from '../services/error.service';
import { MockOrganizationService, OrganizationService } from '../services/organization.service';
import { MockSiteService, SiteService } from '../services/site.service';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockUserService, UserService } from '../services/user.service';
import { MockVisitService, VisitService } from '../services/visit.service';
import { MockVolunteerService, VolunteerService } from '../services/volunteer.service';

export const mockServices = [
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
