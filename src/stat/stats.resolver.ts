import { Args, Query, Resolver } from '@nestjs/graphql';
import { Stat } from './stat.model';
import { StatService } from './stat.service';

@Resolver(() => Stat)
export class StatsResolver {
	constructor(private statsService: StatService) {}

	@Query(() => [Stat])
	async stats(@Args('userId') userId: string): Promise<Stat[]> {
		return this.statsService.getStats(userId);
	}
}
