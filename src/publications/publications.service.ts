import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationRepository } from './publications.repository';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly helpersService: HelpersService
    ) {}
  async create(createPublicationDto: CreatePublicationDto) {
    await this.helpersService.checkMediaAndPost(createPublicationDto.mediaId, createPublicationDto.postId);
    return await this.publicationRepository.create(createPublicationDto);
  }

  async findAll() {
    return await this.publicationRepository.findAll();
  }

  async findOne(id: number) {
    const publication = await this.publicationRepository.findOne(id);
    if (!publication) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }
    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const publication = await this.publicationRepository.findOne(id);
    if (!publication) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }
    return await this.publicationRepository.update(id, updatePublicationDto);
  }

  async remove(id: number) {
    const publication = await this.publicationRepository.findOne(id);
    if (!publication) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }
    await this.helpersService.checkMediaAndPost(publication.mediaId, publication.postId);
    return await this.publicationRepository.remove(id);
  }
}