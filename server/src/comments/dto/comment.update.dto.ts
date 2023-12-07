import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CommentUpdate {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field({ nullable: true })
  parents?: string;
}
