# Monitoring Platform Demo

This repository contains a demo of a monitoring platform.

## Deployment

This demo is deployed on [Railway](https://railway.app/) and can be accessed at the following URL: https://frontend-production-36c7.up.railway.app/.

You can deploy a new version of this demo by pushing to the `main` branch.

## Architecture

### Frontend

The frontend is a React single page application that retrives data from the backend and displays it in a dashboard.

It provides these main functionalities:

- Review the load balancer statistics for a fictional service.
- Start and stop this fictional service.
- Change the number of instances (replicas) of this service that are running.

### Backend

The backend is a Fastify server that exposes the following endpoints:

- `GET /order/statistics`: Generate load balancer data for a fictional service.
- `GET /service/:serviceId`: Returns the status of the service with the given `serviceId`.
- `POST /service/:serviceId/start`: Starts the service with the given `serviceId`.
- `POST /service/:serviceId/stop`: Stops a given deployment for the service with the given `serviceId`.
- `PATCH /service/:serviceId`: Updates the number of replicas for the service with the given `serviceId`.

## Development

### Frontend

To start the frontend in development mode, create a new _.env_ file from the _.env.example_ file in the _frontend_ directory.

Then run:

```bash
cd frontend
npm install
npm run dev
```

### Backend

To start the backend in development mode, create a new _.env_ file from the _.env.example_ file in the _backend_ directory.

Then run:

```bash
cd backend
npm install
npm run dev
```

## Testing

You can run the backend and frontend by running the following command in their respective folders:

```bash
npm test
```

## Improvements

There are many improvements that can be to this demo, for example:

- When we made any changes to the service in the frontend, we don't poll or reload the data from the backend, which means that the user has to reload the page to see the actual results.
- Update the monorepo so that the backend and frontend can share code.
- The backend does not have any CORS policy, which is not secure.
- The backend does not have any authentication or authorization.
- Add more comprehensive tests.
- Add CI/CD pipeline.
