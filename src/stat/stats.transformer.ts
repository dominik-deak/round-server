import { Stat as PrismaStat, User as PrismaUser } from '@prisma/client';
import { Stat } from './stat.model';

export function transformPrismaStat(prismaStat: PrismaStat & { user: PrismaUser }): Stat {
	return {
		id: prismaStat.id,
		userId: prismaStat.userId,
		runway: prismaStat.runway,
		monthlyOutgoing: prismaStat.monthlyOutgoing,
		monthlyIncoming: prismaStat.monthlyIncoming,
		createdAt: prismaStat.createdAt,
		updatedAt: prismaStat.updatedAt,
		user: {
			id: prismaStat.user.id,
			email: prismaStat.user.email,
			firstname: prismaStat.user.firstname || null,
			lastname: prismaStat.user.lastname || null,
			createdAt: prismaStat.user.createdAt,
			updatedAt: prismaStat.user.updatedAt,
			role: prismaStat.user.role,
			posts: null,
			password: ''
		}
	};
}
