export interface Category {
  id: number;
  label: string;
  description?: string;
  organizationId: string;
}

export class Category {
  id: number;
  label: string;
  description?: string;
  organizationId: string;

  constructor(
    id: number,
    label: string,
    description: string,
    organizationId: string,
  ) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.organizationId = organizationId;
  }
}
