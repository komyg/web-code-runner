import { Client, fetchExchange } from '@urql/core';

export const railwayClient = new Client({
  url: process.env.RAILWAY_URL || 'https://backboard.railway.app/graphql/v2',
  exchanges: [fetchExchange],
  fetchOptions: () => {
    const token = process.env.RAILWAY_TOKEN;
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});
