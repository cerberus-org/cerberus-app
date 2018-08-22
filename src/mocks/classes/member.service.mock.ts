import { EMPTY, Observable, of } from 'rxjs';
import { MemberService } from '../../app/core/services/member.service';
import { Member } from '../../app/shared/models';
import { createMockMembers } from '../objects/member.mock';

export class MockMemberService extends MemberService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Member[]> {
    return of(createMockMembers());
  }

  getByKey(key: string, value: string): Observable<Member[]> {
    return of(createMockMembers().filter(user => user[key] === value));
  }

  getById(id: string): Observable<Member> {
    return of(createMockMembers().find(user => user.id === id));
  }

  add(user: Member): Observable<Member> {
    return of(user);
  }

  update(user: any): Observable<any> {
    return of(Promise.resolve());
  }

  remove(user: any): Observable<any> {
    return EMPTY;
  }
}
