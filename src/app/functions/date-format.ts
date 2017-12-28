import * as moment from 'moment-timezone';

export const formatDate = (date: Date, timezone: string): string => {
  return moment(date).tz(timezone).calendar(null, {
    lastDay: '[Yesterday], MMMM D',
    sameDay: '[Today], MMMM D',
    nextDay: '[Tomorrow], MMMM D',
    lastWeek: '[Last] dddd, MMMM D',
    nextWeek: '[Next] dddd, MMMM D',
    sameElse: 'dddd, MMMM D'
  });
};

export const formatTime = (date: Date, timezone: string): string => {
  return date ? moment(date).tz(timezone).format('h:mm a') : 'Active!';
};

export const formatDuration = (startedAt: Date, endedAt: Date, timezone: string): string => {
  return endedAt
    ? moment(startedAt).tz(timezone).to(endedAt, true)
    : moment(startedAt).tz(timezone).toNow(true);
};
