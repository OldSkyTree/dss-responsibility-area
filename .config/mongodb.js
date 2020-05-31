'use strict';

const getParseFunction = (type) => {
    switch(type) {
        case String:
            return (value) => String(value);
        case Number:
            return (value) => Number(value);
        case Boolean:
            return (value) => value === 'true';
        default:
            return (value) => value;
    }
};

const getEnvOr = (envName, defaultValue, type = String) => {
    const parseFunction = getParseFunction(type);

    return parseFunction(process.env[envName] || defaultValue);
};

module.exports = {
    username: getEnvOr('MONGO_DB_USERNAME', ''),
    password: getEnvOr('MONGO_DB_PASSWORD', ''),
    hostname: getEnvOr('MONGO_DB_HOSTNAME', 'localhost'),
    replicaSet: getEnvOr('MONGO_DB_REPLICA_SET', 'local'),
    database: getEnvOr('MONGO_DB_DATABASE', 'dss-base'),
    fakeDb: getEnvOr('MONGO_DB_FAKE', 'false', Boolean)
};
