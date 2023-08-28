import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsRepository],
  imports: [forwardRef(() => HelpersModule)],
})
export class PostsModule {}
