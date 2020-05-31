'use strict';

const getEnvOr = (envName, defaultValue) => {
    return process.env[envName] || defaultValue;
};

module.exports = {
    hostname: getEnvOr('YANDEX_TRACKER_HOSTNAME', 'https://api.tracker.yandex.net/v2/'),
    token: getEnvOr('YANDEX_TRACKER_OAUTH_TOKEN', 'AgAAAAALvbc3AAZit-dxtupr70SLm4aHKgdCEZs'),
    orgId: getEnvOr('YANDEX_CONNECT_ORG_ID', '4098594')
};
