import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';
import { faker } from '@faker-js/faker';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService);

    await prisma.publication.deleteMany();
		await prisma.media.deleteMany();
    await prisma.post.deleteMany();

    await app.init();
  });

  it('/health => should get an alive message', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(HttpStatus.OK)
      .expect("I'm okay!");
  });

  it('POST /medias => should post a media successfully', () => {
    return request(app.getHttpServer())
      .post('/medias')
      .send({
        username: faker.person.firstName(),
        title: faker.word.noun(),
      })
      .expect(HttpStatus.CREATED);
  });

  it('POST /medias => should return status 409 if username and title already exists', async () => {
    const media = await prisma.media.create({
      data: {
        username: faker.person.firstName(),
        title: faker.word.noun(),
      },
    })

    return request(app.getHttpServer())
      .post('/medias')
      .send({
        username: media.username,
        title: media.title,
      })
      .expect(HttpStatus.CONFLICT);
  });

  it('GET /medias => should get all media successfully', async () => {
    await prisma.media.create({
      data: {
        username: faker.person.firstName(),
        title: faker.word.noun(),
      },
    })

    let response = await request(app.getHttpServer()).get('/medias');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
      
  });

  it('GET /posts/:id => should get a post by id successfully', async () => {
    const post = await prisma.post.create({
      data: {
        text: faker.internet.url(),
        title: faker.lorem.sentence(),
      },
    })

    let response = await request(app.getHttpServer()).get(`/posts/${post.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      id: post.id,
      text: post.text,
      title: post.title,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
      
  });

  it('DELETE /posts/:id => should return status 403 if post has publications', async () => {
    const media = await prisma.media.create({
      data: {
        username: faker.person.firstName(),
        title: faker.word.noun(),
      },
    })

    const post = await prisma.post.create({
      data: {
        text: faker.internet.url(),
        title: faker.lorem.sentence(),
      },
    })

    await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: faker.date.recent(),
      },
    })

    let response = await request(app.getHttpServer()).delete(`/posts/${post.id}`);
    expect(response.statusCode).toBe(403);
      
  });

  it('POST /publications => should post a publication successfully', async () => {
    const media = await prisma.media.create({
      data: {
        username: faker.person.firstName(),
        title: faker.word.noun(),
      },
    })

    const post = await prisma.post.create({
      data: {
        text: faker.internet.url(),
        title: faker.lorem.sentence(),
      },
    })

    return request(app.getHttpServer())
      .post('/publications')
      .send({
        mediaId: media.id,
        postId: post.id,
        date: faker.date.recent(),
      })
      .expect(HttpStatus.CREATED);
  });

  it('POST /publications => should return status 404 if media or post not found', async () => {
    const media = await prisma.media.create({
      data: {
        username: faker.person.firstName(),
        title: faker.word.noun(),
      },
    })

    const post = await prisma.post.create({
      data: {
        text: faker.internet.url(),
        title: faker.lorem.sentence(),
      },
    })

    return request(app.getHttpServer())
      .post('/publications')
      .send({
        mediaId: media.id + 1,
        postId: post.id + 1,
        date: faker.date.recent(),
      })
      .expect(HttpStatus.NOT_FOUND);
  });

});
