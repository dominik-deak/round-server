import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Get(':userId')
	async getTransactions(@Param('userId') userId: string) {
		return this.transactionService.getTransactions(userId);
	}
}
