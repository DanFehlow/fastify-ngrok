import { FastifyTypeProvider } from "../types";
//import { PrismaClient } from "@prisma/client";
import z from "zod";

//const prisma = new PrismaClient();

interface NaturalPerson {
  cpf: string;
  nome: string;
  dataNascimento: Date;
  nacionalidade: string;
  email: string;
  sexo: string;
}

const individual: NaturalPerson[] = [];

export async function individualRoutes(app: FastifyTypeProvider) {
  app.get(
    "/individual",
    {
      schema: {
        tags: ["Individual"],
        description: "Listar Pessoa Fisíca",
        response: {
          200: z.array(
            z.object({
              cpf: z.string(),
              nome: z.string(),
              dataNascimento: z.date(),
              nacionalidade: z.string(),
              email: z.string(),
              sexo: z.string(),
            })
          ),
        },
      },
    },
    () => {
      // const entities: NaturalPerson[] = await prisma.NaturalPerson.findMany();
      return individual;
    }
  );

  app.post(
    "/individual",
    {
      schema: {
        tags: ["Individual"],
        description: "Criar pessoa fisíca",
        body: z.object({
          cpf: z.string(),
          nome: z.string(),
          nacionalidade: z.string(),
          dataNascimento: z.string().transform((val) => new Date(val)),
          email: z.string(),
          sexo: z.string(),
        }),
        response: {
          201: z.null().describe("Entidade registrada com sucesso!"),
        },
      },
    },
    async (request, reply) => {
      const { body } = request;
      individual.push({
        ...body,
      });
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
    }
  );
}
