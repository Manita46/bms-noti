import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PublishEventDto {
    @ApiPropertyOptional()
    messageId?: string;
    @ApiProperty()
    eventType!: string;
    @ApiProperty()
    correlationId?: string;
    @ApiProperty()
    payload?: unknown;
}