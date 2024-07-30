import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';
import { StatsResolver } from './stats.resolver';

@Module({
	providers: [StatService, StatsResolver, PrismaService],
	controllers: [StatController]
})
export class StatModule {}
