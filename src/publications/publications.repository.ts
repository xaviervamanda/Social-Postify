import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicationRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(createPublicationDto: CreatePublicationDto) {
    return this.prisma.publication.create({
      data: createPublicationDto,
    });
  }

  findAll() {
    return this.prisma.publication.findMany();
  }
  
  findAllWithPublishedAndAfterFilters(published: boolean, after: string) {
    const currentDay = new Date();
    if (published) {
      return this.prisma.publication.findMany({
        where: {
          date: {
            lt: currentDay,
            gt: after
          }
        },
      });
    }
    return this.prisma.publication.findMany({
      where: {
        date: {
          gte: currentDay,
          gt: after

        }
      }
    });
  }

  findAllWithPublishedFilter(published: boolean) {
    const currentDay = new Date();
    if (published) {
      return this.prisma.publication.findMany({
        where: {
          date: {
            lt: currentDay
          }
        },
      });
    }
    return this.prisma.publication.findMany({
      where: {
        date: {
          gte: currentDay
        }
      }
    });
  }

  findAllWithAfterFilter(after: string) {
    return this.prisma.publication.findMany({
      where: {
        date: {
          gt: after
        }
      }
    })
  }

  findOne(id: number) {
    return this.prisma.publication.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return this.prisma.publication.update({
      where: { id },
      data: updatePublicationDto,
    });
  }

  remove(id: number) {
    return this.prisma.publication.delete({
      where: { id },
    });
  }
}
