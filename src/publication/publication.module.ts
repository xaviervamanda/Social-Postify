import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository],
})
export class PublicationModule {}
