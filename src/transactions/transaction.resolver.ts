import { Args, Query, Resolver } from '@nestjs/graphql';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';

@Resolver(() => Transaction)
export class TransactionResolver {
	constructor(private transactionsService: TransactionService) {}

	@Query(() => [Transaction])
	async transactions(@Args('userId') userId: string): Promise<Transaction[]> {
		return this.transactionsService.getTransactions(userId);
	}
}
