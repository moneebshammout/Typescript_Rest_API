import moment from 'moment';

/**
 * Formats current date.
 */
export const currentDate = (): Date =>
  new Date(moment(new Date()).format('YYYY-MM-DD'));
