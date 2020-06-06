'use strict';

const middleware = require('./middleware');
const routes = require('./routes');

module.exports = (router) => {
    router.param('ticketId', async (req, res, next, ticketId) => {
        req.params.ticketId = ticketId;
        next();
    });

    router.post(
        '/create/:ticketId',
        middleware.logEvent(),
        middleware.parseEvent(),
        routes.create
    );
    router.put(
        '/change/:ticketId',
        middleware.logEvent(),
        middleware.parseEvent(),
        routes.change
    );

    return router;
};
