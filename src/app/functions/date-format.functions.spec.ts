import { mockVisits } from '../mock/objects/visit.mock';
import { convertToTimeString, formatDuration, formatTime } from './date-format.functions';

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

  it('should convert date to time', () => {
    const time = convertToTimeString('2018-04-27T08:05:00.103Z');
    expect(time).toEqual('03:05');
  });

  it('should return empty string', () => {
    const time = convertToTimeString(null);
    expect(time).toEqual('');
  });
});
