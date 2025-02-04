import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { usersRoutes } from "./routes/users";
import FastifyEnv from "@fastify/env";
import { Envs, options } from "./config/envs";
import { healthRoutes } from "./routes/health";
import { todoRoutes } from "./routes/todo";
import { entityRoutes } from "./routes/legalEntity";
import { individualRoutes } from "./routes/individual";
import ngrok from "ngrok";

const app = fastify().withTypeProvider<ZodTypeProvider>();

async function initialize() {
  // =======================
  // Configurações
  // =======================
  app.register(FastifyEnv, options);
  await app.after();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // =======================
  // Registro de Plugins
  // =======================
  app.register(fastifyCors, { origin: "*" });
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Typed API",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  // =======================
  // Definição de Rotas
  // =======================
  app.register(fastifySwaggerUi, {
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
  app.register(healthRoutes);
  app.register(usersRoutes);
  app.register(entityRoutes);
  app.register(individualRoutes);
  //   app.register(todoRoutes);

  // =======================
  // Inicialização do Servidor
  // =======================
  const envs = app.getEnvs<Envs>();
  try {
    await app.ready();
    await app.listen({ port: envs.PORT }).then(async () => {
      console.log(`HTTP server is running on => http://localhost:${envs.PORT}`);

      const url = await ngrok.connect(envs.PORT);
      console.log(`Server is accessible externally at: ${url}`);
    });
  } catch (error) {
    app.log.error(error);
    console.log("CAI NO ERROO");
    process.exit(1);
  }
}

initialize();
