export class Team {
  id: string;
  name: string;
  description: string;
  website: string;

  constructor(name: string, description: string, website: string) {
    this.name = name;
    this.description = description;
    this.website = website;
  }
}
