import Head from 'next/head';
import Link from 'next/link';
import { AwesomeLink } from '../components/AwesomeLink';
import { links } from '../data/links';
import { useLinksQuery } from '../generated/graphql';

export default function Home() {

  const {loading, data, error, fetchMore} = useLinksQuery({
    variables: {
      input: {
        first: 1
      }
    }
  });

  if(loading) {
    return <h1>Loading...</h1>
  }

  if (error) return <p>Oh no... {error.message}</p>;

  const { endCursor, hasNextPage } = data.links.pageInfo;



  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-5xl my-20 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.edges.map(({ node }, i) => (
            <Link href={`/link/${node.id}`} key={i}>
              <a>
                <AwesomeLink
                  title={node.title}
                  category={node.category}
                  url={node.url}
                  id={node.id}
                  description={node.description}
                  imageUrl={node.imageUrl}
                />
              </a>
            </Link>
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              fetchMore({
                variables: { input: { after: endCursor, first: 1 } },
                updateQuery: (prevResults, { fetchMoreResult }) => {
                  fetchMoreResult.links.edges = [
                    ...prevResults.links.edges,
                    ...fetchMoreResult.links.edges
                  ];
                  return fetchMoreResult;
                }
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You've reached the end!
          </p>
        )}
      </div>
    </div>
  );
}
