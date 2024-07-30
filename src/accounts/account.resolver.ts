import { Args, Query, Resolver } from '@nestjs/graphql';
import { Account } from './account.model';
import { AccountService } from './account.service';

@Resolver(() => Account)
export class AccountResolver {
	constructor(private accountsService: AccountService) {}

	@Query(() => [Account])
	async accounts(@Args('userId') userId: string): Promise<Account[]> {
		return this.accountsService.getAccounts(userId);
	}
}
