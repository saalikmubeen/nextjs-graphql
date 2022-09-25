import { ObjectType, Field, ID } from "type-graphql";


@ObjectType()
export class Link {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  category: string;

}


@ObjectType()
export class Edge {

  @Field(() => String)
  cursor: string;

  @Field(() => Link)
  node: Link;

}

@ObjectType()
export class PageInfo {

  @Field(() => String, {nullable: true})
  endCursor: string;

  @Field(() => Boolean)
  hasNextPage: boolean;

}

@ObjectType()
export class Response {

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => [Edge])
  edges: Edge[];

}


