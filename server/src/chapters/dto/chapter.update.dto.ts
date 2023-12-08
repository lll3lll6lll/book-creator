import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ChapterUpdate {
  @Field(() => ID)
  id: number;

  @Field()
  title?: string;

  @Field()
  order?: number;

  @Field()
  bookId?: string;
}
