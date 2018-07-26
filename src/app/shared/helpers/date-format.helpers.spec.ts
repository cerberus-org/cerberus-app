import { createMockVisits } from '../../../mocks/objects/visit.mock';
import { convertToTimeString, formatDuration, formatTime, formatTimeInputValue } from './date-format.functions';

describe('date-format.functions', () => {
  describe('formatTime', () => {
    it('should format times', () => {
      const visit = createMockVisits()[0];
      const formatted = formatTime(visit.startedAt, visit.timezone);
      expect(formatted).toEqual('5:45 AM');
    });
  });

  describe('formatDuration', () => {
    it('should format durations with an end date', () => {
      const visit = createMockVisits()[1];
      const formatted = formatDuration(
        visit.startedAt,
        visit.endedAt,
        visit.timezone,
      );
      expect(formatted).toEqual('6 hours');
    });
  });

  describe('convertToTimeString', () => {
    it('should convert date to time', () => {
      const time = convertToTimeString('2018-04-27T08:05:00.103Z');
      expect(time).toEqual('03:05');
    });

    it('should return empty string', () => {
      const time = convertToTimeString(null);
      expect(time).toEqual('');
    });

    it('should get time given date when formatTimeInputValue is called', () => {
      const visit = createMockVisits()[0];
      expect(formatTimeInputValue(visit.endedAt)).toEqual('09:45');
    });
  });
});
