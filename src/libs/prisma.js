// importamos la clase PrismaClient
import {PrismaClient} from '@prisma/client'

//nos conectamos a la BBDD sqlite definida en .env
export const prisma = new PrismaClient()