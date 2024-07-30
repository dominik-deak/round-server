import { Module, forwardRef } from '@nestjs/common';
import { AccountsModule } from '../accounts/accounts.module';
import { PrismaService } from '../prisma.service';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';

@Module({
	imports: [forwardRef(() => AccountsModule)],
	providers: [TransactionService, TransactionResolver, PrismaService],
	exports: [TransactionService]
})
export class TransactionsModule {}
