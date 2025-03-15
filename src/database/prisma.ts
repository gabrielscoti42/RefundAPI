// Consome o banco de dados dentro da aplicação
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ["query"],
});