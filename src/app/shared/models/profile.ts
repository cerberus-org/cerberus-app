export class Profile {
  id?: string; // The corresponding userUid should be used
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
