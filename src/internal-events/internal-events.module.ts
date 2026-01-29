import { Module } from '@nestjs/common';
import { InternalEventsController } from './internal-events.controller';
import { InternalEventsService } from './internal-events.service';
import { queueModule } from '../queue/queue.module';
import { ApiKeyGuard } from 'src/auth/api-key.guard';

@Module({
    imports: [queueModule],
    controllers: [InternalEventsController],
    providers: [InternalEventsService, ApiKeyGuard],
})
export class InternalEventsModule { }
