'use strict';

var restaurants = require('../controllers/restaurants');

module.exports = function(app) {

    app.get('/restaurants', restaurants.all);
    app.post('/restaurants', restaurants.create);
    app.get('/restaurants/:restaurantId', restaurants.show);
    app.put('/restaurants/:restaurantId', restaurants.update);
    app.get('/restaurants/:restaurantId/port', restaurants.port);
    app.del('/restaurants/:restaurantId', restaurants.destroy);

    // Finish with setting up the Id param
    app.param('restaurantId', restaurants.restaurant);

};