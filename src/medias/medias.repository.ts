import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMediaDto: CreateMediaDto) {
    return await this.prisma.media.create({
      data: createMediaDto,
    });
  }

  async findAll() {
    return await this.prisma.media.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.media.findUnique({
      where: { id },
      include: {
        Publication: true,
      },
    });
  }

  async findOneByTitle(title: string) {
    return await this.prisma.media.findFirst({
      where: { title },
    });
  }

  async findOneByUsername(username: string) {
    return await this.prisma.media.findFirst({
      where: { username },
    });
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    return await this.prisma.media.update({
      where: { id },
      data: updateMediaDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.media.delete({
      where: { id },
    });
  }
}
