import { Module } from '@nestjs/common';
import { PublicationService } from './publications.service';
import { PublicationController } from './publications.controller';
import { PublicationRepository } from './publications.repository';
import { MediasModule } from 'src/medias/medias.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository],
  imports: [MediasModule, PostsModule]
})
export class PublicationModule {}
