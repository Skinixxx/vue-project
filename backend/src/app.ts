import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import clientRouter from './routes/routes';
import { validateStatusUpdate } from './middleware/validationClients';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));



app.use('/api/clients',clientRouter);

app.get('/', (_req, res) => {
    res.send('🗃️  Accounting Widget Backend is up and running!')
  });


app.put('/api/clients/:id/status',validateStatusUpdate);

app.use(errorHandler);

export default app;