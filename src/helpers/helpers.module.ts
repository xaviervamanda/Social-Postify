import { Global, Module, forwardRef } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { MediasModule } from 'src/medias/medias.module';
import { PostsModule } from 'src/posts/posts.module';

@Global()
@Module({
  providers: [HelpersService],
  exports: [HelpersService],
  imports: [forwardRef(() => MediasModule), forwardRef(() => PostsModule)]
})
export class HelpersModule {}
