import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Member } from '../../shared/models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService extends BaseService<Member> {
  collectionName = 'members';

  constructor(protected db: AngularFirestore, protected errorService: ErrorService) {
    super(db, errorService);
  }
}
