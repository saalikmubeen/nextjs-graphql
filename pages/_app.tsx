import '../styles/tailwind.css';
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout';
import { client } from '../lib/apolloClient';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
      </SessionProvider>
  );
}

export default MyApp;
