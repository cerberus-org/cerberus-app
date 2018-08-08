import * as moment from 'moment-timezone';

export const formatDate = (date: Date, timezone: string): string => (
  moment(date).tz(timezone).calendar(null, {
    lastDay: '[Yesterday], MMMM D',
    sameDay: '[Today], MMMM D',
    nextDay: '[Tomorrow], MMMM D',
    lastWeek: '[Last] dddd, MMMM D',
    nextWeek: '[Next] dddd, MMMM D',
    sameElse: 'dddd, MMMM D',
  })
);

export const formatTime = (date: Date, timezone: string): string => (
  date ? moment(date).tz(timezone).format('h:mm A') : 'Active!'
);

export const formatDuration = (startedAt: Date, endedAt: Date, timezone: string): string => (
  endedAt
    ? moment(startedAt).tz(timezone).to(endedAt, true)
    : moment(startedAt).tz(timezone).toNow(true)
);

export const formatTimeInputValue = (date: Date, timezone: string = 'America/Chicago'): string => {
  return date ? moment(date).tz(timezone).format('HH:mm') : '';
};

/**
 * Set time on date (e.g. 3:00) and return updated date.
 *
 * @param {string} time
 * @param {Date} date
 * @param timezone
 * @returns {Date}
 */
export const updateDateWithTimeInput = (time: string, date: Date, timezone = 'American/Chicago'): Date => {
  return moment(date).tz(timezone).set({ hours: Number(time.split(':')[0]), minutes: Number(time.split(':')[1]) }).toDate();
};

/**
 * Accept Date string and convert to time string (e.g 1:35 PM).
 *
 * @param {string} dateString
 * @returns {string} time
 */
export const convertToTimeString = (dateString: string): string => {
  return dateString ? moment(new Date(dateString)).tz('America/Chicago').format('HH:mm') : '';
};
