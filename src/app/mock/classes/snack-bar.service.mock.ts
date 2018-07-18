import { MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { SnackBarService } from '../../shared/services/snack-bar.service';

export class MockSnackBarService extends SnackBarService {

  constructor() {
    super(null);
  }

  open(message: string): MatSnackBarRef<SimpleSnackBar> {
    return null;
  }
}
