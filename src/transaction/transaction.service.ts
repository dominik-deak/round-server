import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionService {
	constructor(private prisma: PrismaService) {}

	async getTransactions(userId: string): Promise<Transaction[]> {
		return this.prisma.transaction.findMany({
			where: { account: { userId } },
			include: { account: true }
		});
	}
}
