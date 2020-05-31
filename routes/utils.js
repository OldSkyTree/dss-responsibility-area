'use strict';

const COMPONENT_PREFIX = 'team: ';

const getTeam = (component) => {
    return component.replace(COMPONENT_PREFIX, '');
};

const getComponent = (team) => {
    return COMPONENT_PREFIX + team;
};

module.exports = {
    getTeam,
    getComponent
};
