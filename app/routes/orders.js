'use strict';

// orders routes use orders controller
var orders = require('../controllers/orders');

module.exports = function(app) {

    app.get('/orders?', orders.filtered);
    app.get('/orders', orders.all);
    app.post('/orders', orders.create);
    app.get('/orders/:orderId', orders.show);
    app.put('/orders/:orderId', orders.update);
    app.del('/orders/:orderId', orders.destroy);

    // Finish with setting up the orderId param
    app.param('orderId', orders.order);

};