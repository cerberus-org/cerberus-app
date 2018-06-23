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
  date ? moment(date).tz(timezone).format('h:mm a') : 'Active!'
);

export const formatDuration = (startedAt: Date, endedAt: Date, timezone: string): string => (
  endedAt
    ? moment(startedAt).tz(timezone).to(endedAt, true)
    : moment(startedAt).tz(timezone).toNow(true)
);

/**
 * Accept Date string and convert to time string (e.g 1:35 PM).
 *
 * @param {string} dateString
 * @returns {string} time
 */
export const convertToTimeString = (dateString: string): string => {
  if (dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesString = minutes < 10 ? '0' + minutes : minutes;
    const hourString = hours.toString().length === 1 ? '0' + hours : hours;
    return hourString + ':' + minutesString;
  }
  return '';
};
