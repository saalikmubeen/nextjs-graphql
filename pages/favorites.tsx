import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { AwesomeLink } from "../components/AwesomeLink";
import { useUserBookmarksQuery } from "../generated/graphql";
import Link from "next/link";

const Favorites = () => {
  const { status } = useSession();
  const router = useRouter();

  const isLoggedIn = status === "authenticated";

  //   useEffect(() => {
  //     if (!isLoggedIn) {
  //       router.push('/')
  //     }
  //   }, [isLoggedIn, status])

  const { data, loading, error } = useUserBookmarksQuery();
  if (error) return <p>Oops! SOmething went wrong {error.message}</p>;
  return (
    <div className="mx-auto my-20 max-w-5xl px-10">
      <h1 className="text-3xl font-medium my-5">My Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.userBookmarks.length === 0 ? (
            <p className="text-2xl font-medium">
              You haven't bookmarked any links yet 👀
            </p>
          ) : (
            data.userBookmarks.map((link) => (
              <Link href={`/link/${link.id}`} key={link.id}>
                <a>
                  <AwesomeLink
                    title={link.title}
                    description={link.description}
                    category={link.category}
                    imageUrl={link.imageUrl}
                    url={link.url}
                    id={link.id}
                  />
                </a>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
