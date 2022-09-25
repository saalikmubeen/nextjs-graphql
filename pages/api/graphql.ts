import "reflect-metadata";
import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { NextApiRequest, NextApiResponse } from 'next';
import { schema } from "../../graphql/buildSchema";
import { createContext } from "../../graphql/context";


const server = new ApolloServer({
    schema: schema,
    context: createContext,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
});

const startServer = server.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://studio.apollographql.com'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }

    await startServer;
    await server.createHandler({ path: "/api/graphql" })(req, res);
}


export const config = {
    api: {
        bodyParser: false
    }
}