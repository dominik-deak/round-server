import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Transaction } from './transaction.model';
import { transformPrismaTransaction } from './transaction.transformer';

@Injectable()
export class TransactionService {
	constructor(private prisma: PrismaService) {}

	async getTransactions(userId: string): Promise<Transaction[]> {
		const transactions = await this.prisma.transaction.findMany({
			where: {
				account: {
					userId
				}
			},
			include: {
				account: true
			}
		});

		return transactions.map(transformPrismaTransaction);
	}
}
