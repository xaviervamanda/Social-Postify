import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
import { HelpersService } from '../helpers/helpers.service';

@Injectable()
export class MediasService {
  constructor(
    private readonly mediasRepository: MediasRepository,
    private readonly helperService: HelpersService
    ) {}

  async create(createMediaDto: CreateMediaDto) {
    await this.helperService.checkMediaDuplicity(createMediaDto.title, createMediaDto.username);
    return await this.mediasRepository.create(createMediaDto);
  }

  async findAll() {
    return await this.mediasRepository.findAll();
  }

  async findOne(id: number) {
    const media = await this.mediasRepository.findOne(id);
    if (!media) {
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }
    return media;
  }
  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const media = await this.mediasRepository.findOne(id);
    if (!media) {
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }
    if (updateMediaDto.title && updateMediaDto.username) {
      await this.helperService.checkMediaDuplicity(updateMediaDto.title, updateMediaDto.username);
    }
    if (updateMediaDto.title) {
      await this.helperService.checkMediaDuplicity(updateMediaDto.title, media.username);
    }
    if (updateMediaDto.username) {
      await this.helperService.checkMediaDuplicity(media.title, updateMediaDto.username);
    }
    return await this.mediasRepository.update(id, updateMediaDto);
  }

  async remove(id: number) {
    const media = await this.mediasRepository.findOne(id);
    if (!media) {
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }
    if (media.Publication.length !== 0){
      throw new HttpException('This media has publications', HttpStatus.FORBIDDEN);
    }
    return await this.mediasRepository.remove(id);
  }
}
