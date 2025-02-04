type Envs = {
    PORT: number,
    DATABASE_URL: string,
    SHADOW_DATABASE_URL: string
}

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
}

const options = {
    confKey: 'config',
    dotenv: true,
    schema,
    data: process.env
}


export {options, Envs}