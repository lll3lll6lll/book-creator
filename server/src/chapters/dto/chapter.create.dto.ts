import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChapterCreate {
  @Field()
  title: string;

  @Field()
  book_id: number;
}
