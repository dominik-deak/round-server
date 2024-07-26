import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Get(':userId')
	async getAccounts(@Param('userId') userId: string) {
		return this.accountService.getAccounts(userId);
	}
}
