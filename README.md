# NextJS and GraphQL

The goal of this project is to show how to build a Fullstack Web application With TypeScript, PostgreSQL, Next.js, Prisma & GraphQL (TypeGraphQL). 
No need to setup a separate server from the client. **DO IT ALL IN NEXTJS**



### Features implemented and demonstrated in the app:
* Set up Prisma on a Next.js project to connect to PostgreSQL database
* Define database models with Prisma
* Define relationship with Prisma (Many-to-Many)
* Execute migration and seed your database with Prisma
* Explore your database with Prisma Studio
* Create a GraphQL schema
* Set up a GraphQL server on Next.js
* Inject Prisma client in the GraphQL context
* Use GraphQL code-first approach using TypeGraphQL
* Set up Apollo client on Next.js to consume a GraphQL API
* Implement the pagination on a GraphQL API
* Set up authentication using NextAuth (using GitHub)
* Store and save the the users in the PostgreSQL database
* Set up relationship between the user model and the link model
* Code generation for your frontend client using @graphql-codegen/cli
* Protecting pages based on the user's role
* Image uploads to AWS S3


_Admins can create links and authenticated users can bookmark the links they like and un-bookmark them._


# Installation

1. Clone project

```
git clone https://github.com/saalikmubeen/nextjs-graphql.git
```

2. cd into root project

`cd nextjs-graphql`

3. Install the dependencies

`npm install` to to install server dependencies

4. 

`Setup required environment variables:` 
 
- DATABASE_URL
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET

5. Run database migrations

`npx prisma db push`

6. Seed the database with some data

`npx prisma db seed`

7. 

`npm run dev` to start development server


> Treat this as a starting point for your next _**Fullstack NextJS and GraphQL** million dollar personal project_.
