import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.use('/api/v1', router);

// const test = async (req: Request, res: Response) => {
//   Promise.reject();
// };

// app.get('/', test);

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
