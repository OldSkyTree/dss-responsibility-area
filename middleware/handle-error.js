'use strict';

module.exports = (err, req, res, next) => {
    if (!err) {
        return next();
    }

    console.log(err);
    console.log('ERROR');

    res.send('ERROR');
};
