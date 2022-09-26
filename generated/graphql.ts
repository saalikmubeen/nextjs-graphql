import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateLinkInput = {
  category: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Edge = {
  __typename?: 'Edge';
  cursor: Scalars['String'];
  node: Link;
};

export type Link = {
  __typename?: 'Link';
  category: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkLink: Link;
  createLink: Link;
};


export type MutationBookmarkLinkArgs = {
  id: Scalars['String'];
};


export type MutationCreateLinkArgs = {
  input: CreateLinkInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
};

export type Pagination = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  link?: Maybe<Link>;
  links: Response;
  userBookmarks: Array<Link>;
};


export type QueryLinkArgs = {
  id: Scalars['String'];
};


export type QueryLinksArgs = {
  input: Pagination;
};

export type Response = {
  __typename?: 'Response';
  edges: Array<Edge>;
  pageInfo: PageInfo;
};

export type LinkQueryVariables = Exact<{
  linkId: Scalars['String'];
}>;


export type LinkQuery = { __typename?: 'Query', link?: { __typename?: 'Link', id: string, description: string, imageUrl: string, url: string, category: string, title: string } | null };

export type LinksQueryVariables = Exact<{
  input: Pagination;
}>;


export type LinksQuery = { __typename?: 'Query', links: { __typename?: 'Response', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'Edge', cursor: string, node: { __typename?: 'Link', id: string, title: string, description: string, imageUrl: string, url: string, category: string } }> } };

export type CreateLinkMutationVariables = Exact<{
  input: CreateLinkInput;
}>;


export type CreateLinkMutation = { __typename?: 'Mutation', createLink: { __typename?: 'Link', id: string, title: string, description: string, imageUrl: string, url: string, category: string } };

export type BookmarkLinkMutationVariables = Exact<{
  bookmarkLinkId: Scalars['String'];
}>;


export type BookmarkLinkMutation = { __typename?: 'Mutation', bookmarkLink: { __typename?: 'Link', id: string, title: string, url: string, description: string, imageUrl: string, category: string } };

export type UserBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type UserBookmarksQuery = { __typename?: 'Query', userBookmarks: Array<{ __typename?: 'Link', description: string, id: string, title: string, imageUrl: string, url: string, category: string }> };


export const LinkDocument = gql`
    query Link($linkId: String!) {
  link(id: $linkId) {
    id
    description
    imageUrl
    url
    category
    title
  }
}
    `;

/**
 * __useLinkQuery__
 *
 * To run a query within a React component, call `useLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinkQuery({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useLinkQuery(baseOptions: Apollo.QueryHookOptions<LinkQuery, LinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinkQuery, LinkQueryVariables>(LinkDocument, options);
      }
export function useLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkQuery, LinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinkQuery, LinkQueryVariables>(LinkDocument, options);
        }
export type LinkQueryHookResult = ReturnType<typeof useLinkQuery>;
export type LinkLazyQueryHookResult = ReturnType<typeof useLinkLazyQuery>;
export type LinkQueryResult = Apollo.QueryResult<LinkQuery, LinkQueryVariables>;
export const LinksDocument = gql`
    query Links($input: Pagination!) {
  links(input: $input) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        title
        description
        imageUrl
        url
        category
      }
    }
  }
}
    `;

/**
 * __useLinksQuery__
 *
 * To run a query within a React component, call `useLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinksQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLinksQuery(baseOptions: Apollo.QueryHookOptions<LinksQuery, LinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinksQuery, LinksQueryVariables>(LinksDocument, options);
      }
export function useLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinksQuery, LinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinksQuery, LinksQueryVariables>(LinksDocument, options);
        }
export type LinksQueryHookResult = ReturnType<typeof useLinksQuery>;
export type LinksLazyQueryHookResult = ReturnType<typeof useLinksLazyQuery>;
export type LinksQueryResult = Apollo.QueryResult<LinksQuery, LinksQueryVariables>;
export const CreateLinkDocument = gql`
    mutation CreateLink($input: CreateLinkInput!) {
  createLink(input: $input) {
    id
    title
    description
    imageUrl
    url
    category
  }
}
    `;
export type CreateLinkMutationFn = Apollo.MutationFunction<CreateLinkMutation, CreateLinkMutationVariables>;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, options);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;
export const BookmarkLinkDocument = gql`
    mutation BookmarkLink($bookmarkLinkId: String!) {
  bookmarkLink(id: $bookmarkLinkId) {
    id
    title
    url
    description
    imageUrl
    category
  }
}
    `;
export type BookmarkLinkMutationFn = Apollo.MutationFunction<BookmarkLinkMutation, BookmarkLinkMutationVariables>;

/**
 * __useBookmarkLinkMutation__
 *
 * To run a mutation, you first call `useBookmarkLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkLinkMutation, { data, loading, error }] = useBookmarkLinkMutation({
 *   variables: {
 *      bookmarkLinkId: // value for 'bookmarkLinkId'
 *   },
 * });
 */
export function useBookmarkLinkMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkLinkMutation, BookmarkLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookmarkLinkMutation, BookmarkLinkMutationVariables>(BookmarkLinkDocument, options);
      }
export type BookmarkLinkMutationHookResult = ReturnType<typeof useBookmarkLinkMutation>;
export type BookmarkLinkMutationResult = Apollo.MutationResult<BookmarkLinkMutation>;
export type BookmarkLinkMutationOptions = Apollo.BaseMutationOptions<BookmarkLinkMutation, BookmarkLinkMutationVariables>;
export const UserBookmarksDocument = gql`
    query UserBookmarks {
  userBookmarks {
    description
    id
    title
    imageUrl
    url
    category
  }
}
    `;

/**
 * __useUserBookmarksQuery__
 *
 * To run a query within a React component, call `useUserBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBookmarksQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserBookmarksQuery(baseOptions?: Apollo.QueryHookOptions<UserBookmarksQuery, UserBookmarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserBookmarksQuery, UserBookmarksQueryVariables>(UserBookmarksDocument, options);
      }
export function useUserBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserBookmarksQuery, UserBookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserBookmarksQuery, UserBookmarksQueryVariables>(UserBookmarksDocument, options);
        }
export type UserBookmarksQueryHookResult = ReturnType<typeof useUserBookmarksQuery>;
export type UserBookmarksLazyQueryHookResult = ReturnType<typeof useUserBookmarksLazyQuery>;
export type UserBookmarksQueryResult = Apollo.QueryResult<UserBookmarksQuery, UserBookmarksQueryVariables>;