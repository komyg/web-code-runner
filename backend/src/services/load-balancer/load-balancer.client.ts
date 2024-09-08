import { add, addMilliseconds } from 'date-fns';
import { CreateOrderRequestData } from '../../types/order.types';
import { generateFiveMinuteIntervals } from '../../common/generate-intervals';

export async function getCreateOrderRequestStatistics(
  startDate: Date,
  endDate: Date
): Promise<CreateOrderRequestData[]> {
  const intervals = generateFiveMinuteIntervals(startDate, endDate);
  return intervals.flatMap((intervalDate, index) =>
    genereateFakeRequests(intervalDate.startDate, index)
  );
}

function genereateFakeRequests(
  startDate: Date,
  index: number
): CreateOrderRequestData[] {
  const min = 2;
  const max = 3;

  const numRequests = createRandomRequests(min, max, index);
  return Array.from({ length: numRequests }, () => {
    return {
      timestamp: createRandomDate(startDate),
      statusCode: 201,
    };
  });
}

function createRandomRequests(min: number, max: number, index: number) {
  const indexCorrection = index / 10;
  const random = Math.random() * (max - min + 1) + min;
  return Math.ceil(random * indexCorrection);
}

function createRandomDate(startDate: Date) {
  const randomMillseconds = generateRandomInteger(0, 5000);
  const newDate = addMilliseconds(startDate, randomMillseconds);
  return newDate;
}

function generateRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
