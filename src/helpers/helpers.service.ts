import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediasRepository } from 'src/medias/medias.repository';

@Injectable()
export class HelpersService {
    constructor(private readonly mediaRepository: MediasRepository) {}

  async checkMediaDuplicity(title: string, username: string) {
    const mediaTitle = await this.mediaRepository.findOneByTitle(title);
    const mediaUsername = await this.mediaRepository.findOneByUsername(username);
    if (mediaTitle !== null && mediaUsername !== null && mediaTitle.id === mediaUsername.id) {
      throw new HttpException('This social media already exists for this user', HttpStatus.CONFLICT);
    }
  }
}
