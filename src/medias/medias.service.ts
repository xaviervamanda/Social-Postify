import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) {}
  create(createMediaDto: CreateMediaDto) {
    return this.mediasRepository.create(createMediaDto);
  }

  findAll() {
    return this.mediasRepository.findAll();
  }

  findOne(id: number) {
    return this.mediasRepository.findOne(id);
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.mediasRepository.update(id, updateMediaDto);
  }

  remove(id: number) {
    return this.mediasRepository.remove(id);
  }
}
