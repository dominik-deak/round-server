import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../users/models/user.model';

@ObjectType()
export class Stat {
	@Field(() => ID)
	id: string;

	@Field()
	userId: string;

	@Field(() => Float)
	runway: number;

	@Field(() => Float)
	monthlyOutgoing: number;

	@Field(() => Float)
	monthlyIncoming: number;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;

	@Field(() => User)
	user: User;
}
