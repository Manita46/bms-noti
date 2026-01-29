import { Body, Controller, Post, HttpCode, UseGuards } from '@nestjs/common';
import { InternalEventsService } from './internal-events.service';
import { PublishEventDto } from './dto/publish-event.dto';
import { ApiKeyGuard } from 'src/auth/api-key.guard';
import { ApiOkResponse, ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('api-key')
@Controller('internal')
@UseGuards(ApiKeyGuard)
export class InternalEventsController {
    constructor(private readonly service: InternalEventsService) { }

    @Post('events')
    @HttpCode(200)
    @ApiOkResponse({
        description: 'Event published successfully',
    })
    async publish(@Body() body: PublishEventDto) {
        return this.service.publishEvent(body);
    }
}
