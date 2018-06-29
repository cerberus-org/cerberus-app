/**
 * The database consists of a Member object and a Firebase Member object.
 * Both objects are coupled in this object for simplicity.
 * The Member service removes all fields that are only meant to be in the
 * Firebase Member object on convert out.
 */
export class Member {
  id: string;
  userUid: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  role?: string;

  constructor(
    firstName: string,
    lastName: string,
    role?: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
