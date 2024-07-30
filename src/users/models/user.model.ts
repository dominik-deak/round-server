import { Field, HideField, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsEmail } from 'class-validator';
import 'reflect-metadata';
import { BaseModel } from '../../common/models/base.model';
import { Post } from '../../posts/models/post.model';

registerEnumType(Role, {
	name: 'Role',
	description: 'User role'
});

@ObjectType()
export class User extends BaseModel {
	@Field()
	@IsEmail()
	email: string;

	@Field(() => String, { nullable: true })
	firstname?: string;

	@Field(() => String, { nullable: true })
	lastname?: string;

	@Field(() => Role)
	role: Role;

	@Field(() => [Post], { nullable: true })
	posts?: Post[] | null;

	@HideField()
	password: string;
}
