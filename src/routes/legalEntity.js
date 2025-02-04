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
exports.entityRoutes = entityRoutes;
//import { PrismaClient } from "@prisma/client";
const zod_1 = __importDefault(require("zod"));
const entities = [];
function entityRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/entitys", {
            schema: {
                tags: ["Entity"],
                description: "Listar Pessoa Jurídica",
                response: {
                    200: zod_1.default.array(zod_1.default.object({
                        cnpj: zod_1.default.string(),
                        razaoSocial: zod_1.default.string(),
                        nomeFantasia: zod_1.default.string(),
                        cnaePrincipal: zod_1.default.string(),
                        email: zod_1.default.string(),
                    })),
                },
            },
        }, () => {
            //const entities: LegalEntity[] = await prisma.legalEntity.findMany();
            return entities;
        });
        app.post("/entitys", {
            schema: {
                tags: ["Entity"],
                description: "Criar nova entidade",
                body: zod_1.default.object({
                    cnpj: zod_1.default.string(),
                    razaoSocial: zod_1.default.string(),
                    nomeFantasia: zod_1.default.string(),
                    cnaePrincipal: zod_1.default.string(),
                    email: zod_1.default.string(),
                }),
                response: {
                    201: zod_1.default.null().describe("Entidade registrada com sucesso!"),
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            entities.push(Object.assign({}, body));
            return reply.status(201).send();
            // try {
            //   await prisma.legalEntity.create({
            //     data: {
            //       cnpj,
            //       razaoSocial,
            //       nomeFantasia,
            //       cnaePrincipal,
            //       email,
            //     },
            //   });
            //   return reply.status(201).send();
            // } catch (error) {
            //   return reply.status(400).send();
            // }
        }));
    });
}
