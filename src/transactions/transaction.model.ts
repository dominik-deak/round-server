import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Account } from '../accounts/account.model';

@ObjectType()
export class Transaction {
	@Field(() => ID)
	id: string;

	@Field()
	accountId: string;

	@Field(() => Account)
	account: Account;

	@Field(() => Float)
	amount: number;

	@Field()
	type: string;

	@Field({ nullable: true })
	description?: string;

	@Field()
	date: Date;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
