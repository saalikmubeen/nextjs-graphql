import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { Link } from "./Link";


enum Role {
    USER,
    ADMIN
}

registerEnumType(Role, {
    name: "Role", // this one is mandatory
    description: "Role of the user: USER or ADMIN", // this one is optional
});


@ObjectType()
class User  {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    email!: string;

    @Field(() => String)
    image!: string;

    @Field(type => Role)
    role!: Role;

    @Field(() => [Link])
    bookmarks?: Link[]
}



export { User };