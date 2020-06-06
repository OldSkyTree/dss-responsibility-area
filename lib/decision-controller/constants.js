'use strict';

const LIMIT_LEVENSHTEIN_DISTANCE = 2;

const TEAMS = {
    A: 'a',
    B: 'b',
    C: 'c',
    D: 'd',
    E: 'e'
};

const INITIAL_MODELS = [
    { questions: { instrument: 'Google Поиск' }, resolution: TEAMS.A },
    { questions: { instrument: 'Youtube' }, resolution: TEAMS.B },
    { questions: { instrument: 'Почта' }, resolution: TEAMS.C },
    { questions: { instrument: 'Картинки' }, resolution: TEAMS.A },
    { questions: { instrument: 'Диск' }, resolution: TEAMS.E },
    { questions: { instrument: 'Карты' }, resolution: TEAMS.D },
    { questions: { instrument: 'Переводчик' }, resolution: TEAMS.E },
    { questions: { instrument: 'Инструмента нет в списке' }, resolution: null },
    {
        questions: {
            instrument: 'Почта',
            'playback-location': ['Локально']
        },
        resolution: TEAMS.C
    },
    {
        questions: {
            instrument: 'Картинки',
            'playback-location': ['Локально']
        },
        resolution: TEAMS.C
    },
    {
        questions: {
            instrument: 'Диск',
            'playback-location': ['Локально']
        },
        resolution: TEAMS.C
    },
    {
        questions: {
            instrument: 'Youtube',
            'playback-location': ['Локально']
        },
        resolution: TEAMS.C
    }
];

module.exports = {
    LIMIT_LEVENSHTEIN_DISTANCE,
    TEAMS,
    INITIAL_MODELS
};
