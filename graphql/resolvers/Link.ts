import { Resolver, Query, Mutation, Arg, Ctx, InputType, Field, ID } from "type-graphql";
import type { Context } from "../context";
import { Link, Response } from "../schemas/Link";

@InputType()
class CreateLinkInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  category: string;
}


@InputType()
class Pagination {
  @Field(() => Number)
  first: number;

  @Field(() => String, { nullable: true })
  after?: string;
}


@Resolver(Link)
export class LinkResolver {

  @Query(() => Response)
  async links(@Arg("input", () => Pagination) input: Pagination, @Ctx() ctx: Context): Promise<Response> {
    let queryResults = null;


    // check if there is a cursor as the argument
    if (input.after) {
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

    if (queryResults.length > 0) {
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

  @Query(() => Link, { nullable: true })
  link(@Arg("id", () => String) id: string, @Ctx() ctx: Context): Promise<Link> {
    return ctx.prisma.link.findUnique({
      where: {
        id: id
      }
    });
  }

  @Mutation(() => Link)
  async createLink(
    @Arg("input", () => CreateLinkInput) input: CreateLinkInput,
    @Ctx() ctx: Context
  ): Promise<Link> {

    if (!ctx.user) {
      throw new Error(`You need to be logged in to perform an action`)
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        email: ctx.user.email,
      },
    });

     if (user.role !== 'ADMIN') {
      throw new Error(`You do not have permission to perform action`);
    }

    const newLink = {
      title: input.title,
      url: input.url,
      imageUrl: input.imageUrl,
      category: input.category,
      description: input.description,
    }

    return await ctx.prisma.link.create({
      data: newLink,
    });
  }

  @Query(() => [Link])
    async userBookmarks(@Ctx() ctx: Context): Promise<Link[]> {

        if(!ctx.user) {
            throw new Error("Sign in to see your bookmarks.")
        }

        const user = await ctx.prisma.user.findUnique({
            where: {
              email: ctx.user.email,
            },
            include: {
              bookmarks: true,
            },
        });

          if (!user) throw new Error('Invalid user');

          return user.bookmarks as any;
    }

}