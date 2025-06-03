import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Feed } from '@prisma/client';

@Injectable()
export class FeedsDao {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Feed[]> {
    return this.prisma.feed.findMany({ orderBy: { priority: 'asc' } });
  }
}
