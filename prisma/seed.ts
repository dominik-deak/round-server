import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Clear existing data
	await prisma.stat.deleteMany();
	await prisma.transaction.deleteMany();
	await prisma.account.deleteMany();
	await prisma.post.deleteMany();
	await prisma.user.deleteMany();

	console.log('Seeding...');

	// Users
	const user1 = await prisma.user.create({
		data: {
			email: 'lisa@simpson.com',
			firstname: 'Lisa',
			lastname: 'Simpson',
			password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
			role: 'USER',
			posts: {
				create: {
					title: 'Join us for Prisma Day 2019 in Berlin',
					content: 'https://www.prisma.io/day/',
					published: true
				}
			}
		}
	});
	const user2 = await prisma.user.create({
		data: {
			email: 'bart@simpson.com',
			firstname: 'Bart',
			lastname: 'Simpson',
			role: 'ADMIN',
			password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
			posts: {
				create: [
					{
						title: 'Subscribe to GraphQL Weekly for community news',
						content: 'https://graphqlweekly.com/',
						published: true
					},
					{
						title: 'Follow Prisma on Twitter',
						content: 'https://twitter.com/prisma',
						published: false
					}
				]
			}
		}
	});
	console.log({ user1, user2 });

	// Accounts
	const account1 = await prisma.account.create({
		data: {
			userId: user1.id,
			name: "Lisa's Account",
			balance: 1500
		}
	});
	const account2 = await prisma.account.create({
		data: {
			userId: user2.id,
			name: "Bart's Account",
			balance: 500
		}
	});
	console.log({ account1, account2 });

	// Transactions
	const transactions = await prisma.transaction.createMany({
		data: [
			{
				accountId: account1.id,
				amount: -200,
				type: 'outgoing',
				description: 'Music Lessons',
				date: new Date()
			},
			{
				accountId: account1.id,
				amount: 500,
				type: 'incoming',
				description: 'Gift',
				date: new Date()
			},
			{
				accountId: account2.id,
				amount: -50,
				type: 'outgoing',
				description: 'Skateboard Repairs',
				date: new Date()
			},
			{
				accountId: account2.id,
				amount: 100,
				type: 'incoming',
				description: 'Allowance',
				date: new Date()
			}
		]
	});
	console.log({ transactions });

	// Stats
	const stats1 = await prisma.stat.create({
		data: {
			userId: user1.id,
			runway: 12,
			monthlyOutgoing: 200,
			monthlyIncoming: 500
		}
	});
	const stats2 = await prisma.stat.create({
		data: {
			userId: user2.id,
			runway: 6,
			monthlyOutgoing: 50,
			monthlyIncoming: 100
		}
	});
	console.log({ stats1, stats2 });
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
