export class Site {
  id: string;
  teamId: string;
  description: string;
  name: string;
  address: string;

  constructor(teamId: string, name: string, address: string, description: string) {
    this.teamId = teamId;
    this.name = name;
    this.address = address;
    this.description = description;
  }
}
