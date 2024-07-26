import { Injectable } from '@nestjs/common';
import { Stat } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StatService {
	constructor(private prisma: PrismaService) {}

	async getStats(userId: string): Promise<Stat[]> {
		return this.prisma.stat.findMany({
			where: { userId }
		});
	}
}
