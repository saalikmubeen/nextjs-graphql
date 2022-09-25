import path from "path";
import { buildSchema } from "type-graphql";
import { LinkResolver } from "./resolvers/Link";

console.log(process.cwd() + "graphql/schema.graphql")

export const schema = await buildSchema({
  resolvers: [
    LinkResolver
  ],
  emitSchemaFile: {
    path: process.cwd() + "/graphql/schema.graphql",
    commentDescriptions: true,
    sortedSchema: false, // by default the printed schema is sorted alphabetically
  },
  
});