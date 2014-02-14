'use strict';

var gatherings = require('../controllers/gatherings');

module.exports = function(app) {

    app.get('/gatherings', gatherings.all);
    app.post('/gatherings', gatherings.create);
    app.get('/gatherings/:gatheringId', gatherings.show);
    app.put('/gatherings/:gatheringId', gatherings.update);
    app.del('/gatherings/:gatheringId', gatherings.destroy);

    // Finish with setting up the Id param
    app.param('gatheringId', gatherings.gathering);

};