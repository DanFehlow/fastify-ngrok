import { FastifyTypeProvider } from "../types";
//import { PrismaClient } from "@prisma/client";
import z from "zod";

//const prisma = new PrismaClient();

interface LegalEntity {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnaePrincipal: string;
  email: string;
}
const entities: LegalEntity[] = [];

export async function entityRoutes(app: FastifyTypeProvider) {
  app.get(
    "/entitys",
    {
      schema: {
        tags: ["Entity"],
        description: "Listar Pessoa Jurídica",
        response: {
          200: z.array(
            z.object({
              cnpj: z.string(),
              razaoSocial: z.string(),
              nomeFantasia: z.string(),
              cnaePrincipal: z.string(),
              email: z.string(),
            })
          ),
        },
      },
    },
    () => {
      //const entities: LegalEntity[] = await prisma.legalEntity.findMany();
      return entities;
    }
  );

  app.post(
    "/entitys",
    {
      schema: {
        tags: ["Entity"],
        description: "Criar nova entidade",
        body: z.object({
          cnpj: z.string(),
          razaoSocial: z.string(),
          nomeFantasia: z.string(),
          cnaePrincipal: z.string(),
          email: z.string(),
        }),
        response: {
          201: z.null().describe("Entidade registrada com sucesso!"),
        },
      },
    },
    async (request, reply) => {
      const { body } = request;
      entities.push({
        ...body,
      });
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
    }
  );
}
