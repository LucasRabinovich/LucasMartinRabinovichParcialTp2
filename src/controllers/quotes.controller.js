import * as quotesService from '../services/quotes.service.js';

export const getRandomQuote = async (req, res) => {
    let httpStatus = 200;
    let responseData = {};  

    try {
        responseData = await quotesService.getRandomQuote();
    } catch (error) {
        httpStatus = 503;
        responseData = { error: 'Service Unavailable' };
    }

    res.status(httpStatus).json(responseData);
};

export const getFavorites = async (req,res) => {
    let httpStatus = 200;
    let responseData = {};

    try {
        const list = await quotesService.getFavorite();
        responseData = { favorites: list };
    } catch (error) {
        httpStatus = 500;
        responseData = { error: 'Internal Server Error' };
    }

    res.status(httpStatus).json(responseData);
};

export const addFavorite = async (req, res) => {    
    let httpStatus = 201;
    let responseData = {};
    const { quote, author } = req.body;

    if(quote && author) {
        try {
            const saveItem = await quotesService.saveFavorite({ quote, author });
            responseData =  {message: 'Favorite added successfully', favorite: saveItem };

        } catch (error) {
            httpStatus = 500;
            responseData = { error: 'Internal Server Error' };
        }
    } else {
        httpStatus = 400;
        responseData = { error: 'Missing required fields: quote and author are required' };
    }
    res.status(httpStatus).json(responseData);
};

export const deleteFavorite = async (req, res) => {
    let httpStatus = 200;
    let responseData = {};
    const { id } = req.params;
    try {
        const isRemoved = await quotesService.deleteFavorite(id);
        if (isRemoved) {
            responseData = { message: 'Favorite deleted successfully' };
        }else {
            httpStatus = 404;
            responseData = { error: 'Favorite not found' };
        }
    } catch (error) {
        httpStatus = 500;
        responseData = { error: 'Internal Server Error' };
    }
    res.status(httpStatus).json(responseData);
};
    
            