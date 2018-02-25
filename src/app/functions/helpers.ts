import { Visit } from '../models/visit';

export const sortVisitsByDate = (visits: Visit[]) => (
  visits.slice().sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
);

export const filterByOrganizationId = (array: [], organizationId: string) => (
  array.filter(item => item.organizationId === organizationId)
);
