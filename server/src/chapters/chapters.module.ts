import { Module } from '@nestjs/common';
import { ChaptersService } from './services/chapters.service';
import { ChaptersResolver } from './resolvers/chapters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from '@src/chapters/entities/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter])],
  providers: [ChaptersService, ChaptersResolver],
})
export class ChaptersModule {}
