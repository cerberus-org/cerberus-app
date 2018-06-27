import { mockVisits } from '../mock/objects/visit.mock';
import { formatDuration, formatTime } from './date-format.functions';

describe('date-format.functions', () => {
  it('should format times', () => {
    const formatted = formatTime(mockVisits[0].startedAt, mockVisits[0].timezone);
    expect(formatted).toEqual('5:45 am');
  });

  it('should format durations with an end date', () => {
    const formatted = formatDuration(
      mockVisits[1].startedAt,
      mockVisits[1].endedAt,
      mockVisits[0].timezone,
    );
    expect(formatted).toEqual('6 hours');
  });
});
