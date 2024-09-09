export interface SummarizedOrderRequestData {
  startDate: Date;
  endDate: Date;
  totalRequests: number;
  successfulRequests: number; // 2XX
  failedRequests: number; // 4XX
  serverErrorRequests: number; // 500
  badGatewayRequests: number; // 502
  serviceUnavailableRequests: number; // 503
  gatewayTimeoutRequests: number; // 504
}

export interface OrderStatistics extends SummarizedOrderRequestData {
  time: string;
}
