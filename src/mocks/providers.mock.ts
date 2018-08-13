import { MatDialogRef } from '@angular/material';

import { AuthService } from '../app/auth/services/auth.service';
import { ErrorService } from '../app/core/services/error.service';
import { MemberService } from '../app/core/services/member.service';
import { SiteService } from '../app/core/services/site.service';
import { SnackBarService } from '../app/core/services/snack-bar.service';
import { TeamService } from '../app/core/services/team.service';
import { VisitService } from '../app/core/services/visit.service';
import { VolunteerService } from '../app/core/services/volunteer.service';
import { CsvService } from '../app/settings/services/csv.service';
import { MockAuthService } from './classes/auth.service.mock';
import { MockCsvService } from './classes/csv.service.mock';
import { MockErrorService } from './classes/error.service.mock';
import { MockSiteService } from './classes/site.service.mock';
import { MockSnackBarService } from './classes/snack-bar.service.mock';
import { MockTeamService } from './classes/team.service.mock';
import { MockUserService } from './classes/user.service.mock';
import { MockVisitService } from './classes/visit.service.mock';
import { MockVolunteerService } from './classes/volunteer.service.mock';

class MatDialogRefMock {
  close() { }
}

export const mockProviders = [
  { provide: AuthService, useClass: MockAuthService },
  { provide: CsvService, useClass: MockCsvService },
  { provide: ErrorService, useClass: MockErrorService },
  { provide: TeamService, useClass: MockTeamService },
  { provide: SiteService, useClass: MockSiteService },
  { provide: SnackBarService, useClass: MockSnackBarService },
  { provide: MemberService, useClass: MockUserService },
  { provide: VisitService, useClass: MockVisitService },
  { provide: VolunteerService, useClass: MockVolunteerService },
  { provide: MatDialogRef, useClass: MatDialogRefMock },
];
