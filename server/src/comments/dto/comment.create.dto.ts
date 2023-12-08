import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentCreate {
  @Field()
  text: string;

  @Field({ nullable: true })
  parents: string;

  @Field()
  entityId: string;
}
