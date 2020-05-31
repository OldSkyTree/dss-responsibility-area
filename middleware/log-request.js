'use strict';

const morgan = require('morgan');

module.exports = () => {
    const format = ':ticketId –– :datetime';

    return morgan(format);
};
