import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MediasModule } from './medias/medias.module';
import { PublicationModule } from './publication/publication.module';
import { PrismaModule } from './prisma/prisma.module';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [PostsModule, MediasModule, PublicationModule, PrismaModule, HelpersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
