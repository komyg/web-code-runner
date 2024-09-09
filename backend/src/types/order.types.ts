export interface CreateOrderRequestData {
  statusCode: number;
  timestamp: Date;
}

export interface SummarizedOrderRequestData {
  startDate: Date;
  endDate: Date;
  totalRequests: number;
  successfulRequests: number; // 2XX
  failedRequests: number; // 4XX
  serverErrorRequests: number; // 500
  badGatewayRequests: number; // 502
  serviceUnabailableRequests: number; // 503
  gatewayTimeoutRequests: number; // 504
}
