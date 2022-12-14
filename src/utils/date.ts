import moment from 'moment';

/**
 * Formats current date.
 */
export const currentDate = (withTime = true): Date =>
  withTime
    ? new Date(moment(new Date()).format('YYYY-MM-DD HH:MM'))
    : new Date(moment(new Date()).format('YYYY-MM-DD'));
