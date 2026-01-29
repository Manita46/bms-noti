import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { queueService } from '../queue/queue.service';
import { PublishEventDto } from './dto/publish-event.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class InternalEventsService {
    constructor(
        private readonly queue: queueService,
        private readonly config: ConfigService,
    ) { }

    async publishEvent(dto: PublishEventDto) {
        const messageId = dto.messageId ?? randomUUID();

        const eventType = dto.eventType?.trim();
        if (!eventType) {
            throw new BadRequestException('eventType is required');
        }

        const routingKey = eventType;

        const envelope = {
            messageId,
            eventTypeCode: dto.eventType,
            correlationId: dto.correlationId ?? null,
            payload: dto.payload ?? null,
            //   receivedAt: new Date().toISOString(),
        };

        await this.queue.publish(routingKey, envelope);

        return {
            success: true,
            data: { messageId },
            //   message: 'Event published.',
        };
    }
}
