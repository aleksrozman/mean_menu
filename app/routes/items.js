'use strict';

// items routes use items controller
var items = require('../controllers/items');

module.exports = function(app) {

    app.get('/items?', items.filtered);
    app.get('/items', items.all);
    app.post('/items', items.createItem);
    app.post('/categories', items.createCategory);
    app.get('/items/:itemId', items.showItem);
    app.get('/categories/:categoryId', items.showCategory);
    app.put('/items/:itemId', items.updateItem);
    app.put('/categories/:categoryId', items.updateCategory);
    app.del('/items/:itemId', items.destroyItem);
    app.del('/categories/:categoryId', items.destroyCategory);

    // Finish with setting up the itemId param
    app.param('itemId', items.item);
    app.param('categoryId', items.category);

};