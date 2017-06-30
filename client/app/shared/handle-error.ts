import { Observable } from 'rxjs/Observable';

export default function handleError (error: Response | any) {
  return Observable.throw(error.json().error || 'Server error');
}
