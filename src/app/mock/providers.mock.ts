import { AuthService } from '../auth/services/auth.service';
import { MemberService } from '../data/services/member.service';
import { OrganizationService } from '../data/services/organization.service';
import { SiteService } from '../data/services/site.service';
import { VisitService } from '../data/services/visit.service';
import { VolunteerService } from '../data/services/volunteer.service';
import { CsvService } from '../settings/services/csv.service';
import { ErrorService } from '../shared/services/error.service';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { MockAuthService } from './classes/auth.service.mock';
import { MockCsvService } from './classes/csv.service.mock';
import { MockErrorService } from './classes/error.service.mock';
import { MockOrganizationService } from './classes/organization.service.mock';
import { MockSiteService } from './classes/site.service.mock';
import { MockSnackBarService } from './classes/snack-bar.service.mock';
import { MockUserService } from './classes/user.service.mock';
import { MockVisitService } from './classes/visit.service.mock';
import { MockVolunteerService } from './classes/volunteer.service.mock';

export const mockServiceProviders = [
  { provide: AuthService, useClass: MockAuthService },
  { provide: CsvService, useClass: MockCsvService },
  { provide: ErrorService, useClass: MockErrorService },
  { provide: OrganizationService, useClass: MockOrganizationService },
  { provide: SiteService, useClass: MockSiteService },
  { provide: SnackBarService, useClass: MockSnackBarService },
  { provide: MemberService, useClass: MockUserService },
  { provide: VisitService, useClass: MockVisitService },
  { provide: VolunteerService, useClass: MockVolunteerService },
];
