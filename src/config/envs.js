"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const schema = {
    type: 'object',
    required: ['PORT'],
    properties: {
        PORT: {
            type: 'number'
        },
        DATABASE_URL: {
            type: 'string'
        },
        SHADOW_DATABASE_URL: {
            type: 'string'
        },
    }
};
const options = {
    confKey: 'config',
    dotenv: true,
    schema,
    data: process.env
};
exports.options = options;
