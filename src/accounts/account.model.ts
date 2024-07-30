import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Transaction } from '../transactions/transaction.model';

@ObjectType()
export class Account {
	@Field(() => ID)
	id: string;

	@Field()
	userId: string;

	@Field()
	name: string;

	@Field()
	bank: string;

	@Field(() => Float)
	balance: number;

	@Field(() => [Transaction], { nullable: true })
	transactions?: Transaction[];

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
