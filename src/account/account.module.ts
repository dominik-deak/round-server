import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
	providers: [AccountService, PrismaService],
	controllers: [AccountController]
})
export class AccountModule {}
