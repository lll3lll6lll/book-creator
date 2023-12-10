import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CommentUpdate {
  @Field(() => ID)
  id: number;

  @Field()
  text: string;
}
