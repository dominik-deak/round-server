import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TransactionsModule } from '../transactions/transactions.module';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Module({
	imports: [forwardRef(() => TransactionsModule)],
	providers: [AccountService, AccountResolver, PrismaService],
	exports: [AccountService]
})
export class AccountsModule {}
