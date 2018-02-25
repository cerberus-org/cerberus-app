import { testVisits } from '../models/visit';
import { formatDuration, formatTime } from './date-format.functions';

describe('formatTime()', () => {
  it('should format times', () => {
    const formatted = formatTime(testVisits[0].startedAt, testVisits[0].timezone);
    expect(formatted).toEqual('5:45 am');
  });
});

describe('formatDuration()', () => {
  it('should format durations with an end date', () => {
    const formatted = formatDuration(
      testVisits[1].startedAt,
      testVisits[1].endedAt,
      testVisits[0].timezone,
    );
    expect(formatted).toEqual('6 hours');
  });
});
