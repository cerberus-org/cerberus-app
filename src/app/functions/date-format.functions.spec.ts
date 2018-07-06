import { createMockVisits } from '../mock/objects/visit.mock';
import { convertToTimeString, formatDuration, formatTime } from './date-format.functions';

describe('date-format.functions', () => {
  it('should format times', () => {
    const visit = createMockVisits()[0];
    const formatted = formatTime(visit.startedAt, visit.timezone);
    expect(formatted).toEqual('5:45 AM');
  });

  it('should format durations with an end date', () => {
    const visit = createMockVisits()[1];
    const formatted = formatDuration(
      visit.startedAt,
      visit.endedAt,
      visit.timezone,
    );
    expect(formatted).toEqual('6 hours');
  });

  xit('should convert date to time', () => {
    const time = convertToTimeString('2018-04-27T08:05:00.103Z');
    expect(time).toEqual('08:05');
  });

  it('should return empty string', () => {
    const time = convertToTimeString(null);
    expect(time).toEqual('');
  });
});
