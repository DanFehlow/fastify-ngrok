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
exports.individualRoutes = individualRoutes;
//import { PrismaClient } from "@prisma/client";
const zod_1 = __importDefault(require("zod"));
const individual = [];
function individualRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/individual", {
            schema: {
                tags: ["Individual"],
                description: "Listar Pessoa Fisíca",
                response: {
                    200: zod_1.default.array(zod_1.default.object({
                        cpf: zod_1.default.string(),
                        nome: zod_1.default.string(),
                        dataNascimento: zod_1.default.date(),
                        nacionalidade: zod_1.default.string(),
                        email: zod_1.default.string(),
                        sexo: zod_1.default.string(),
                    })),
                },
            },
        }, () => {
            // const entities: NaturalPerson[] = await prisma.NaturalPerson.findMany();
            return individual;
        });
        app.post("/individual", {
            schema: {
                tags: ["Individual"],
                description: "Criar pessoa fisíca",
                body: zod_1.default.object({
                    cpf: zod_1.default.string(),
                    nome: zod_1.default.string(),
                    nacionalidade: zod_1.default.string(),
                    dataNascimento: zod_1.default.string().transform((val) => new Date(val)),
                    email: zod_1.default.string(),
                    sexo: zod_1.default.string(),
                }),
                response: {
                    201: zod_1.default.null().describe("Entidade registrada com sucesso!"),
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            individual.push(Object.assign({}, body));
            return reply.status(201).send();
            // try {
            //   await prisma.NaturalPerson.create({
            //     data: {
            //       cpf,
            //       nome,
            //       dataNascimento,
            //       nacionalidade,
            //       email,
            //       sexo,
            //     },
            //   });
            //   return reply.status(201).send();
            // } catch (error) {
            //   return reply.status(400).send();
            // }
        }));
    });
}
