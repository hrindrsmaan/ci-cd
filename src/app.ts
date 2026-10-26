import express, { Application } from 'express';
import { router } from './routes';

/**
 * App factory. Keeping `listen()` out of this module lets tests import the
 * app and drive it with supertest — no real port is opened.
 */
export function createApp(): Application {
  const app = express();

  app.use(express.json());
  app.use('/', router);

  return app;
}
