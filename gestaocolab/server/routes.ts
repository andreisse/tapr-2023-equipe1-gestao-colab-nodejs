import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import gestaocolabRouter from './api/controllers/gestaocolab/router'
import contratoRouter from './api/controllers/contrato/router'

export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/gestaocolab', gestaocolabRouter);  
  app.use('/api/v1/contrato', contratoRouter);  
}

