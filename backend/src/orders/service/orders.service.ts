import { add, getMinutes } from 'date-fns';
import { getCreateOrderRequestStatistics } from '../client/load-balancer.client';
import {
  CreateOrderRequestData,
  SummarizedOrderRequestData,
} from '../types/order.types';
import { generateFiveMinuteIntervals } from '../common/generate-intervals';

interface CreateOrderRequestDataWithInterval extends CreateOrderRequestData {
  startDate: Date;
  endDate: Date;
}

export async function getOrderStatistics(startDate: Date, endDate: Date) {
  const loadBalancerData = await getCreateOrderRequestStatistics(
    startDate,
    endDate
  );
  const aggregatedData = aggregateData(
    startDate,
    endDate,
    loadBalancerData
  ).filter((data) => data.length > 0);
  return summarizeData(aggregatedData);
}

function summarizeData(
  aggregatedData: CreateOrderRequestDataWithInterval[][]
): SummarizedOrderRequestData[] {
  return aggregatedData.map((data) => {
    return {
      totalRequests: data.length,
      startDate: data[0].startDate,
      endDate: data[0].endDate,
      successfulRequests: data.filter(
        (d) => d.statusCode >= 200 && d.statusCode < 300
      ).length,
      failedRequests: data.filter(
        (d) => d.statusCode >= 400 && d.statusCode < 500
      ).length,
      serverErrorRequests: data.filter((d) => d.statusCode === 500).length,
      badGatewayRequests: data.filter((d) => d.statusCode === 502).length,
      serviceUnabailableRequests: data.filter((d) => d.statusCode === 503)
        .length,
      gatewayTimeoutRequests: data.filter((d) => d.statusCode === 504).length,
    };
  });
}

function aggregateData(
  startDate: Date,
  endDate: Date,
  loadBalancerData: CreateOrderRequestData[]
) {
  const intervals = generateFiveMinuteIntervals(startDate, endDate);
  const aggretatedData: CreateOrderRequestDataWithInterval[][] = intervals.map(
    () => []
  );

  loadBalancerData.forEach((data: CreateOrderRequestData) => {
    const intervalIndex = getIntervalIndexForTimestamp(data.timestamp);
    aggretatedData[intervalIndex].push({
      ...intervals[intervalIndex],
      ...data,
    });
  });

  return aggretatedData;
}

function getIntervalIndexForTimestamp(timestamp: Date) {
  const minutes = getMinutes(timestamp);
  return Math.floor(minutes / 5);
}
