import { FirebaseError } from 'firebase';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ErrorService } from '../../shared/services/error.service';

export class MockErrorService extends ErrorService {

  constructor() {
    super(null);
  }

  handleFirebaseError(error: FirebaseError) {
    return of(null).pipe(filter(e => !!e));
  }

  handleLoginError(error: FirebaseError) {
    return of(null).pipe(filter(e => !!e));
  }
}
