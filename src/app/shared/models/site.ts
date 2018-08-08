export class Site {
  id: string;
  teamId: string;
  description: string;
  label: string;
  address: string;

  constructor(teamId: string, label: string, address: string, description: string) {
    this.teamId = teamId;
    this.label = label;
    this.address = address;
    this.description = description;
  }
}
