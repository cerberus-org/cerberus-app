import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

export default class HttpError {
  constructor(private router: Router) {}

  handleError (error: Response | any) {
    if (error.status === 401) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
    return Observable.throw(error || 'Server error');
  }
}
