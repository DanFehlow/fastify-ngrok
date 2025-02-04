"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const cors_1 = require("@fastify/cors");
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const swagger_1 = require("@fastify/swagger");
const swagger_ui_1 = require("@fastify/swagger-ui");
const users_1 = require("./routes/users");
const env_1 = __importDefault(require("@fastify/env"));
const envs_1 = require("./config/envs");
const health_1 = require("./routes/health");
const legalEntity_1 = require("./routes/legalEntity");
const individual_1 = require("./routes/individual");
const ngrok_1 = __importDefault(require("ngrok"));
const app = (0, fastify_1.fastify)().withTypeProvider();
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        // =======================
        // Configurações
        // =======================
        app.register(env_1.default, envs_1.options);
        yield app.after();
        app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
        app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
        // =======================
        // Registro de Plugins
        // =======================
        app.register(cors_1.fastifyCors, { origin: "*" });
        app.register(swagger_1.fastifySwagger, {
            openapi: {
                info: {
                    title: "Typed API",
                    version: "1.0.0",
                },
            },
            transform: fastify_type_provider_zod_1.jsonSchemaTransform,
        });
        // =======================
        // Definição de Rotas
        // =======================
        app.register(swagger_ui_1.fastifySwaggerUi, {
            routePrefix: "/docs",
            uiConfig: {
                docExpansion: "list",
                deepLinking: false,
            },
            staticCSP: true,
            transformStaticCSP: (header) => header,
            transformSpecification: (swaggerObject, request, reply) => {
                return swaggerObject;
            },
            transformSpecificationClone: true,
        });
        app.register(health_1.healthRoutes);
        app.register(users_1.usersRoutes);
        app.register(legalEntity_1.entityRoutes);
        app.register(individual_1.individualRoutes);
        //   app.register(todoRoutes);
        // =======================
        // Inicialização do Servidor
        // =======================
        const envs = app.getEnvs();
        try {
            yield app.ready();
            yield app.listen({ port: envs.PORT }).then(() => __awaiter(this, void 0, void 0, function* () {
                console.log(`HTTP server is running on => http://localhost:${envs.PORT}`);
                const url = yield ngrok_1.default.connect(envs.PORT);
                console.log(`Server is accessible externally at: ${url}`);
            }));
        }
        catch (error) {
            app.log.error(error);
            console.log("CAI NO ERROO");
            process.exit(1);
        }
    });
}
initialize();
