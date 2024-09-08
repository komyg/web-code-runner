import {
  add,
  getMilliseconds,
  getMinutes,
  subMilliseconds,
  subMinutes,
} from 'date-fns';

export function generateFiveMinuteIntervals(startDate: Date, endDate: Date) {
  const intervals = [];
  let currentDate = subMinutes(startDate, getMinutes(startDate));
  currentDate = subMilliseconds(currentDate, getMilliseconds(currentDate));
  while (currentDate.valueOf() < endDate.valueOf()) {
    const nextDate = add(currentDate, { minutes: 5 });
    intervals.push({ startDate: currentDate, endDate: nextDate });
    currentDate = nextDate;
  }

  return intervals;
}
