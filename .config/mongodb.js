'use strict';

const getEnvOr = (envName, defaultValue) => {
    return process.env[envName] || defaultValue;
};

module.exports = {
    username: getEnvOr('MONGO_DB_USERNAME', ''),
    password: getEnvOr('MONGO_DB_PASSWORD', ''),
    hostname: getEnvOr('MONGO_DB_HOSTNAME', 'localhost'),
    replicaSet: getEnvOr('MONGO_DB_REPLICA_SET', 'local'),
    database: getEnvOr('MONGO_DB_DATABASE', 'mergeQueue'),
};
