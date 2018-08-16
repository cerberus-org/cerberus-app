import { Injectable } from '@angular/core';
import { Member } from '../../shared/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService extends BaseService<Member> {
  collectionName = 'members';
}
