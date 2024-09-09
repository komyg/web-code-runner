import { add, addMilliseconds, interval } from 'date-fns';
import { CreateOrderRequestData } from '../../types/order.types';
import { generateFiveMinuteIntervals } from '../../common/generate-intervals';

type RequestTypes =
  | 'successfulRequests'
  | 'failedRequests'
  | 'serverErrorRequests'
  | 'badGatewayRequests'
  | 'serviceUnabailableRequests'
  | 'gatewayTimeoutRequests';

interface RequestMinMax {
  min: number;
  max: number;
  statusCode: number;
}

type RequestsPerStatusCodes = Record<RequestTypes, RequestMinMax>;

const requestPerStatusCodes: RequestsPerStatusCodes = {
  successfulRequests: { min: 500, max: 700, statusCode: 201 },
  failedRequests: { min: 10, max: 15, statusCode: 400 },
  serverErrorRequests: { min: 0, max: 2, statusCode: 500 },
  badGatewayRequests: { min: 50, max: 100, statusCode: 502 },
  serviceUnabailableRequests: { min: 50, max: 300, statusCode: 503 },
  gatewayTimeoutRequests: { min: 0, max: 0, statusCode: 504 },
};

export async function getCreateOrderRequestStatistics(
  startDate: Date,
  endDate: Date
): Promise<CreateOrderRequestData[]> {
  const intervals = generateFiveMinuteIntervals(startDate, endDate);
  return Object.keys(requestPerStatusCodes).flatMap((requestType) =>
    intervals.flatMap((intervalDate, index) =>
      genereateFakeRequests(
        intervalDate.startDate,
        index,
        requestType as RequestTypes,
        intervals.length
      )
    )
  );
}

function genereateFakeRequests(
  startDate: Date,
  index: number,
  type: RequestTypes,
  intervalLength: number
): CreateOrderRequestData[] {
  const { min, max } = requestPerStatusCodes[type];
  const numRequests = createRandomRequests(
    min,
    max,
    index,
    type,
    intervalLength
  );
  return Array.from({ length: numRequests }, () => {
    return {
      timestamp: createRandomDate(startDate),
      statusCode: requestPerStatusCodes[type].statusCode,
    };
  });
}

function createRandomRequests(
  min: number,
  max: number,
  index: number,
  type: RequestTypes,
  intervalLength: number
) {
  if (
    index < intervalLength - 3 &&
    (type === 'serviceUnabailableRequests' || type === 'badGatewayRequests')
  ) {
    return 0;
  }

  const indexCorrection = (index + 1) / 10;
  const random = Math.random() * (max - min + 1) + min;
  const result = Math.ceil(random * indexCorrection);
  return result;
}

function createRandomDate(startDate: Date) {
  const randomMillseconds = generateRandomInteger(1, 4000);
  const newDate = addMilliseconds(startDate, randomMillseconds);
  return newDate;
}

function generateRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
