import {Router} from 'express';
import * as quotesController from '../controllers/quotes.controller.js';

const apiRouter = Router();

apiRouter.get('/random', quotesController.getRandomQuote);
apiRouter.get('/favorites', quotesController.getFavorites);
apiRouter.post('/favorites', quotesController.addFavorite);
apiRouter.delete('/favorites/:id', quotesController.deleteFavorite);

export default apiRouter;