import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediasRepository } from 'src/medias/medias.repository';
import { PostsRepository } from 'src/posts/posts.repository';

@Injectable()
export class HelpersService {
    constructor(
      private readonly mediasRepository: MediasRepository,
      private readonly postsRepository: PostsRepository
      ) {}

  async checkMediaDuplicity(title: string, username: string) {
    const mediaTitle = await this.mediasRepository.findOneByTitle(title);
    const mediaUsername = await this.mediasRepository.findOneByUsername(username);
    if (mediaTitle !== null && mediaUsername !== null && mediaTitle.id === mediaUsername.id) {
      throw new HttpException('This social media already exists for this user', HttpStatus.CONFLICT);
    }
  }

  async checkMediaAndPost (mediaId: number, postId: number) {
    const media = await this.mediasRepository.findOne(mediaId);
    const post = await this.postsRepository.findOne(postId);
    if (!media || !post) {
      throw new HttpException ('Post or Media not found', HttpStatus.NOT_FOUND);
    }
  }
}
