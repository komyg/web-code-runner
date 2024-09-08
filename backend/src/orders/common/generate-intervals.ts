import { add } from 'date-fns';

export function generateFiveMinuteIntervals(startDate: Date, endDate: Date) {
  const intervals = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const nextDate = add(currentDate, { minutes: 5 });
    intervals.push({ startDate: currentDate, endDate: nextDate });
    currentDate = nextDate;
  }

  return intervals;
}
