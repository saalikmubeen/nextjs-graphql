import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next"
import prismaClient from '../lib/prismaClient';
import { authOptions } from "../pages/api/auth/[...nextauth]"

export interface Context {
  prisma: PrismaClient;
  user?: {
    name?: string;
    email?: string;
    image?: string;
 }
};


export async function createContext({ req, res }: {req: NextApiRequest, res: NextApiResponse}): Promise<Context> {
 
  const session = await unstable_getServerSession(req, res, authOptions);
  
  if(!session) return { prisma: prismaClient };

  const { user } = session

  return {
    prisma: prismaClient,
    user
  }
  
}
