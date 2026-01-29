import { Module } from '@nestjs/common';
import { queueService } from './queue.service';

@Module({
    providers: [queueService],
    exports: [queueService],
})
export class queueModule { }
