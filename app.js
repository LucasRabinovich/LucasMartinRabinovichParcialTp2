import express from 'express';
import apiQuotesRouter from './src/routes/quotes.routes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/quotes', apiQuotesRouter);

export default app;