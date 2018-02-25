export const sortVisitsByDate = visits => (
  visits.slice().sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
);
