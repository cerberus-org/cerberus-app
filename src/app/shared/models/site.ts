export class Site {
  id: string;
  organizationId: string;
  description: string;
  label: string;
  address: string;

  constructor(organizationId: string, label: string, address: string, description: string) {
    this.organizationId = organizationId;
    this.label = label;
    this.address = address;
    this.description = description;
  }
}
