import { Module, forwardRef } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { MediasRepository } from './medias.repository';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
  exports: [MediasService, MediasRepository],
  imports: [forwardRef(() => HelpersModule)]
})
export class MediasModule {}
