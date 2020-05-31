'use strict';

const LIMIT_LEVENSHTEIN_DISTANCE = 2;

const TEAMS = {
    A: 'a',
    B: 'b',
    C: 'c',
    D: 'd',
    E: 'e',
    NULL: 'null',
    CHANGED: 'changed'
};

const INITIAL_MODELS = [
    { questions: { instrument: { answer: 'Google Поиск' } }, resolution: TEAMS.A },
    { questions: { instrument: { answer: 'Youtube' } }, resolution: TEAMS.B },
    { questions: { instrument: { answer: 'Почта' } }, resolution: TEAMS.C },
    { questions: { instrument: { answer: 'Картинки' } }, resolution: TEAMS.A },
    { questions: { instrument: { answer: 'Диск' } }, resolution: TEAMS.E },
    { questions: { instrument: { answer: 'Карты' } }, resolution: TEAMS.D },
    { questions: { instrument: { answer: 'Переводчик' } }, resolution: TEAMS.E },
    { questions: { instrument: { answer: 'Инструмента нет в списке' } }, resolution: null },
    {
        questions: {
            instrument: { answer: 'Почта' },
            'playback-location': { answer: ['Локально'] }
        },
        resolution: TEAMS.C
    },
    {
        questions: {
            instrument: { answer: 'Картинки' },
            'playback-location': { answer: ['Локально'] }
        },
        resolution: TEAMS.C
    },
    {
        questions: {
            instrument: { answer: 'Диск' },
            'playback-location': { answer: ['Локально'] }
        },
        resolution: TEAMS.C
    },
    {
        questions: {
            instrument: { answer: 'Youtube' },
            'playback-location': { answer: ['Локально'] }
        },
        resolution: TEAMS.C
    }
];

module.exports = {
    LIMIT_LEVENSHTEIN_DISTANCE,
    TEAMS,
    INITIAL_MODELS
};
