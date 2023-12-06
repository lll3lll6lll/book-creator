import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BookUpdate {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  ownerId: string;
}
