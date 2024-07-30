import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Account } from './account.model';

@Injectable()
export class AccountService {
	constructor(private prisma: PrismaService) {}

	async getAccounts(userId: string): Promise<Account[]> {
		const accounts = await this.prisma.account.findMany({
			where: { userId },
			include: {
				transactions: {
					include: {
						account: true
					}
				}
			}
		});

		return accounts.map(account => ({
			...account,
			transactions: account.transactions.map(transaction => ({
				...transaction,
				account: {
					...transaction.account,
					transactions: []
				}
			}))
		}));
	}
}
