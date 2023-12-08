import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Chapter } from '@src/chapters/entities/chapter.entity';
import { ChaptersService } from '@src/chapters/services/chapters.service';
import { ChapterUpdate } from '@src/chapters/dto/chapter.update.dto';
import { ChapterCreate } from '@src/chapters/dto/chapter.create.dto';

@Resolver()
export class ChaptersResolver {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Mutation(() => Chapter)
  async createChapter(
    @Args({ name: 'dto', type: () => ChapterCreate })
    chapterCreate: ChapterCreate,
  ): Promise<Chapter> {
    return await this.chaptersService.createChapter(chapterCreate);
  }

  @Mutation(() => Chapter)
  async updateChapter(
    @Args({ name: 'dto', type: () => ChapterUpdate })
    chapterUpdate: ChapterUpdate,
  ): Promise<Chapter> {
    return await this.chaptersService.updateChapter(chapterUpdate);
  }

  @Mutation(() => Number)
  async removeChapter(@Args('id') id: string): Promise<string> {
    return await this.chaptersService.removeChapter(id);
  }

  @Query(() => Chapter)
  async getOneChapter(@Args('id') id: string): Promise<Chapter> {
    return await this.chaptersService.getOneChapter(id);
  }
}
