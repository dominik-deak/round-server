import { Transaction } from '../transactions/transaction.model';
import { Account } from './account.model';

export function transformPrismaAccount(prismaAccount: any): Account {
	return {
		id: prismaAccount.id,
		userId: prismaAccount.userId,
		name: prismaAccount.name,
		bank: prismaAccount.bank,
		balance: prismaAccount.balance,
		createdAt: prismaAccount.createdAt,
		updatedAt: prismaAccount.updatedAt,
		transactions: prismaAccount.transactions.map((transaction: any) => transformPrismaTransaction(transaction))
	};
}

function transformPrismaTransaction(prismaTransaction: any): Transaction {
	return {
		id: prismaTransaction.id,
		accountId: prismaTransaction.accountId,
		amount: prismaTransaction.amount,
		type: prismaTransaction.type,
		description: prismaTransaction.description,
		date: prismaTransaction.date,
		createdAt: prismaTransaction.createdAt,
		updatedAt: prismaTransaction.updatedAt,
		account: {
			id: prismaTransaction.account.id,
			userId: prismaTransaction.account.userId,
			name: prismaTransaction.account.name,
			bank: prismaTransaction.account.bank,
			balance: prismaTransaction.account.balance,
			createdAt: prismaTransaction.account.createdAt,
			updatedAt: prismaTransaction.account.updatedAt,
			transactions: []
		}
	};
}
