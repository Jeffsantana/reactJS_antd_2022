import {
  differenceInYears,
  differenceInWeeks,
  differenceInDays,
  differenceInMonths,
  addYears,
  addWeeks,
  addDays,
  addMonths,
} from 'date-fns';

export default (value: string) => {
  switch (value) {
    case 'years':
    case 'year':
      return { difference: differenceInYears, add: addYears };
    case 'weeks':
    case 'week':
      return { difference: differenceInWeeks, add: addWeeks };
    case 'days':
    case 'day':
      return { difference: differenceInDays, add: addDays };
    case 'months':
    case 'month':
    default:
      return { difference: differenceInMonths, add: addMonths };
  }
};
