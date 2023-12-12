import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BookUpdate {
  @Field(() => ID)
  id: number;

  @Field()
  title?: string;
}
