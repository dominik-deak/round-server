import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SyncService {
	constructor(private prisma: PrismaService) {}

	@Cron('0 */6 * * *') // Runs every 6 hours
	async handleCron() {
		console.log('Running data sync...');

		// Simulate fetching new data
		const newTransactions = [
			{
				accountId: 'f99eed10-f362-5a97-b9ba-b209591825ba', // random GUID
				amount: -100,
				type: 'outgoing',
				description: 'Sample Transaction',
				date: new Date()
			}
		];

		for (const transaction of newTransactions) {
			try {
				// Check if the accountId exists
				const account = await this.prisma.account.findUnique({
					where: { id: transaction.accountId }
				});

				if (!account) {
					console.error(`Account with ID ${transaction.accountId} does not exist. Skipping transaction.`);
					continue;
				}

				// Create the transaction
				await this.prisma.transaction.create({
					data: transaction
				});

				// Update the account balance
				const newBalance =
					transaction.type === 'incoming'
						? account.balance + transaction.amount
						: account.balance - transaction.amount;

				await this.prisma.account.update({
					where: { id: transaction.accountId },
					data: { balance: newBalance }
				});
			} catch (error) {
				console.error(`Failed to process transaction for account ${transaction.accountId}:`, error);
			}
		}

		// Update stats
		const users = await this.prisma.user.findMany({
			include: {
				accounts: {
					include: {
						transactions: true
					}
				}
			}
		});

		for (const user of users) {
			const monthlyIncoming = user.accounts.reduce((sum, account) => {
				const incoming = account.transactions.filter(t => t.type === 'incoming').reduce((acc, t) => acc + t.amount, 0);
				return sum + incoming;
			}, 0);

			const monthlyOutgoing = user.accounts.reduce((sum, account) => {
				const outgoing = account.transactions.filter(t => t.type === 'outgoing').reduce((acc, t) => acc + t.amount, 0);
				return sum + outgoing;
			}, 0);

			const runway = user.accounts.reduce((minRunway, account) => {
				const avgMonthlySpending =
					account.transactions.filter(t => t.type === 'outgoing').reduce((acc, t) => acc + t.amount, 0) / 30;

				const accountRunway = avgMonthlySpending > 0 ? account.balance / avgMonthlySpending : Infinity;

				return Math.min(minRunway, accountRunway);
			}, Infinity);

			await this.prisma.stat.upsert({
				where: { userId: user.id },
				update: {
					monthlyIncoming,
					monthlyOutgoing,
					runway
				},
				create: {
					userId: user.id,
					monthlyIncoming,
					monthlyOutgoing,
					runway
				}
			});
		}

		console.log('Data sync completed.');
	}
}
