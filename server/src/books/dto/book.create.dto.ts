import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BookCreate {
  @Field()
  title: string;

  @Field()
  ownerId: number;
}
