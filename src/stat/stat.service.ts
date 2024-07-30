import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Stat } from './stat.model';
import { transformPrismaStat } from './stats.transformer';

@Injectable()
export class StatService {
	constructor(private prisma: PrismaService) {}

	async getStats(userId: string): Promise<Stat[]> {
		const stats = await this.prisma.stat.findMany({
			where: { userId },
			include: {
				user: true
			}
		});

		return stats.map(transformPrismaStat);
	}
}
