import { PrismaClient } from '@prisma/client';
import prismaClient from '../lib/prismaClient';

export interface Context {
  prisma: PrismaClient;
};


export async function createContext({ req, res }): Promise<Context> {

  return {
    prisma: prismaClient
  };
}
