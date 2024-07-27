import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';

@Module({
	providers: [StatService, PrismaService],
	controllers: [StatController]
})
export class StatModule {}
