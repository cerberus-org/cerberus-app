import { Visit } from '../models';

export const sortVisitsByDate = (visits: Visit[]) => (
  visits.slice().sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
);

export const filterByOrganizationId = (array: any[], organizationId: string) => (
  array.filter(item => item.organizationId === organizationId)
);
