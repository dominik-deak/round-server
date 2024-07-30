import { Account } from 'src/accounts/account.model';
import { Transaction } from '../transactions/transaction.model';

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

export function transformPrismaTransaction(prismaTransaction: any): Transaction {
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
			...prismaTransaction.account,
			transactions: []
		}
	};
}
