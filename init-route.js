'use strict';

const middleware = require('./middleware');
const routes = require('./routes');

module.exports = (router) => {
    // router.param('ticketId', async (req, res, next, ticketId) => {
    //     req.body.ticketId = ticketId;
    //     next();
    // });

    router.post(
        '/create',
        // middleware.logRequest,
        middleware.parseRequest,
        routes.create
    );
    router.put(
        '/change',
        // middleware.logRequest,
        middleware.parseRequest,
        routes.change
    );
    router.post(
        '/test',
        (req, res) => {
            console.log(req.body);
            res.send('success');
        }
    );

    return router;
};
