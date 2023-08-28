import { Global, Module, forwardRef } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { MediasModule } from '../medias/medias.module';
import { PostsModule } from '../posts/posts.module';

@Global()
@Module({
  providers: [HelpersService],
  exports: [HelpersService],
  imports: [forwardRef(() => MediasModule), forwardRef(() => PostsModule)]
})
export class HelpersModule {}
