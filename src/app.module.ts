import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import config from './common/configs/config';

// Modules
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { StatModule } from './stat/stat.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

// Services
import { AppService } from './app.service';
import { GqlConfigService } from './gql-config.service';
import { PrismaService } from './prisma.service';
import { SyncService } from './sync/sync.service';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [config] }),
		PrismaModule.forRoot({
			isGlobal: true,
			prismaServiceOptions: {
				middlewares: [
					loggingMiddleware({
						logger: new Logger('PrismaMiddleware'),
						logLevel: 'log'
					})
				]
			}
		}),
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			useClass: GqlConfigService
		}),
		ScheduleModule.forRoot(),
		AuthModule,
		UsersModule,
		PostsModule,
		AccountsModule,
		TransactionsModule,
		StatModule
	],
	controllers: [AppController],
	providers: [AppService, AppResolver, PrismaService, SyncService]
})
export class AppModule {}
