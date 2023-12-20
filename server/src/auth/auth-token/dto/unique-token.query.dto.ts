import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class UniqueTokenQueryDto {
  @Field()
  user_id: number;
}
