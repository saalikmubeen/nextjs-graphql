import path from "path";
import { buildSchema } from "type-graphql";
import { LinkResolver } from "./resolvers/Link";
import { userResolver } from "./resolvers/User";

export const schema = await buildSchema({
  resolvers: [
    LinkResolver,
    userResolver
  ],
  emitSchemaFile: {
    path: process.cwd() + "/graphql/schema.graphql",
    commentDescriptions: true,
    sortedSchema: false, // by default the printed schema is sorted alphabetically
  },
  
});