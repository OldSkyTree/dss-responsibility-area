'use strict';

const _ = require('lodash');

module.exports = class FakeDB {
    static create() {
        return new FakeDB();
    }

    constructor() {
        this._storage = [];
    }

    async insertOne(value) {
        this._storage.push(value);

        return value;
    }

    async updateOne(filter, updates) {
        const findedValue = await this.findOne(filter);

        return _.assign(findedValue, _.get(updates, '$set'));
    }

    async findOne(filter) {
        return (await this.find(filter))[0];
    };

    async find(filter) {
        const findedValues = _.filter(this._storage, (value) => {
            return _.every(filter, (val, key) => value[key] === val);
        });
        
        findedValues.toArray = () => {
            delete findedValues.toArray;

            return findedValues;
        };

        return findedValues;
    }
}
