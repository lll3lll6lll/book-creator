import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentCreate {
  @Field()
  text: string;

  @Field({ nullable: true })
  parent_id?: number;

  @Field()
  book_id: number;

  @Field({ nullable: true })
  chapter_id?: number;
}
