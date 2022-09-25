import { Resolver, Query, Arg, Ctx, InputType, Field, ID} from "type-graphql";
import type { Context } from "../context";
import { Link, Response } from "../schemas/Link";

@InputType()
class Pagination {
  @Field(() => Number)
  first: number;

  @Field(() => String, {nullable: true})
  after?: string;
}


@Resolver(Link)
export class LinkResolver {

  @Query(() => Response)
  async links(@Arg("input", () => Pagination) input: Pagination,  @Ctx() ctx: Context): Promise<Response> {
     let queryResults = null;


     // check if there is a cursor as the argument
     if(input.after) {
         queryResults = await ctx.prisma.link.findMany({
          take: input.first, // the number of items to return from the database
          skip: 1, // skip the cursor
          cursor: {
            id: input.after // the cursor
          }
         })

     } else {
      // if there is no cursor. Means this is the first request and we will return the first items in the database

      queryResults = await ctx.prisma.link.findMany({
        take: input.first
      })

     }

     // now we need to determine if we have more links

     if(queryResults.length > 0) {
        const lastLinkInResults = queryResults[queryResults.length - 1];

        const newCursor = lastLinkInResults.id;

        // query after the cursor to check if we have a next page (check if there are more results)
        const checkMoreResults = await ctx.prisma.link.findMany({
          take: input.first,
          skip: 1,
          cursor: {
            id: newCursor
          }
        })

        // form the response and return it
        const result = {
          pageInfo: {
            endCursor: newCursor,
            hasNextPage: checkMoreResults.length > 0  
          },

          edges: queryResults.map((link) => {
            return {
              cursor: link.id,
              node: link
            }
          })
        }

        return result;

     } else {

      return {
        pageInfo: {
          endCursor: null,
          hasNextPage: false
        },
        edges: []
      }
     }


  }

  @Query(() => Link, {nullable: true})
  link(@Arg("id", () => String) id: string , @Ctx() ctx: Context): Promise<Link> {
    return ctx.prisma.link.findUnique({
      where: {
        id: id
      }
    });
  }

}