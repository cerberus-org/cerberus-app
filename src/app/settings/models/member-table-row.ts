import { Member, User } from '../../shared/models';

export interface MemberTableRow {
  member: Member;
  user: User;
  roleOptions: string[];
}
