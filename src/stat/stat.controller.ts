import { Controller, Get, Param } from '@nestjs/common';
import { StatService } from './stat.service';

@Controller('stats')
export class StatController {
	constructor(private readonly statService: StatService) {}

	@Get(':userId')
	async getStats(@Param('userId') userId: string) {
		return this.statService.getStats(userId);
	}
}
