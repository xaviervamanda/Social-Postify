import { Global, Module, forwardRef } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { MediasModule } from 'src/medias/medias.module';

@Global()
@Module({
  providers: [HelpersService],
  exports: [HelpersService],
  imports: [forwardRef(() => MediasModule)]
})
export class HelpersModule {}
