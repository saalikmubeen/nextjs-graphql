import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import type { Context } from "../context";
import { Link } from "../schemas/Link";
import { User } from "../schemas/User";

@Resolver(User)
class userResolver {

    @Mutation(() => Link)
    async bookmarkLink(
        @Arg("id", () => String) id: string,
        @Ctx() ctx: Context
    ): Promise<Link> {

        if (!ctx.user) {
            throw new Error("Please log in first to bookmark this link.")
        }

        const link = await ctx.prisma.link.findUnique({
            where: { id: id },
        });

        const user = await ctx.prisma.user.findUnique({
            where: { email: ctx.user.email },
            include: {
                bookmarks: true
            }
        });

        const alreadyBookmarked = user.bookmarks.some((bookmark) => {
            return bookmark.id === link.id
        })

        console.log(alreadyBookmarked);

        if (alreadyBookmarked) {
            await ctx.prisma.user.update({
                where: {
                    email: ctx.user.email,
                },
                data: {
                    bookmarks: {
                        disconnect: {
                            id: link.id,
                        },
                    },
                },
            });
        } else {
            await ctx.prisma.user.update({
                where: {
                    email: ctx.user.email,
                },
                data: {
                    bookmarks: {
                        connect: {
                            id: link.id,
                        },
                    },
                },
            });
        }

        return link;
    }

}

export { userResolver };