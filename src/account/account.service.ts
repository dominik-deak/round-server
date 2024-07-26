import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AccountService {
	constructor(private prisma: PrismaService) {}

	async getAccounts(userId: string): Promise<Account[]> {
		return this.prisma.account.findMany({
			where: { userId }
		});
	}
}
