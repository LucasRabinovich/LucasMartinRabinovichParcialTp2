import fs from 'node:fs/promises';
import path from 'node:path';

const DB_PATH = path.join(process.cwd(), 'data', 'favorites.json');

export const getRandomQuote = async () => {
    let resultQuote = null; 

    try {
        const externalRes = await fetch('https://zenquotes.io/api/random');
        
        if (externalRes.ok) {
            const apiData = await externalRes.json();
            if (apiData && apiData[0]) {
                resultQuote = {
                    quote: apiData[0].q,
                    author: apiData[0].a
                };
            } else {
                throw new Error('Data format error');
            }
        } else {
            
            throw new Error(`Error: ${externalRes.status}`);
        }
    } catch (error) {
        throw new Error('Service Unavailable');
    }

    return resultQuote;
};

export const getFavorites = async () => { 
    let currentFavorites = [];
    try {
        const fileContent = await fs.readFile(DB_PATH, 'utf-8');
        currentFavorites = JSON.parse(fileContent);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(DB_PATH, '[]');
        } else {
            throw new Error('File read error');
        }
    }
    return currentFavorites;
};

export const saveFavorite = async (payload) => {
    let createdItem = null;
    const list = await getFavorites(); 

    createdItem = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        quote: payload.quote,
        author: payload.author
    };
    
    list.push(createdItem);
    await fs.writeFile(DB_PATH, JSON.stringify(list, null, 2), 'utf-8');
    
    return createdItem;
};

export const deleteFavorite = async (favoriteId) => {
    let wasDeleted = false;
    const list = await getFavorites();
    const targetId = parseInt(favoriteId, 10); 

    const itemIndex = list.findIndex(item => item.id === targetId); 
    
    if (itemIndex !== -1) {
        list.splice(itemIndex, 1);
        await fs.writeFile(DB_PATH, JSON.stringify(list, null, 2), 'utf-8');
        wasDeleted = true;
    }
    
    return wasDeleted;
};