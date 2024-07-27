import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
	providers: [TransactionService, PrismaService],
	controllers: [TransactionController]
})
export class TransactionModule {}
