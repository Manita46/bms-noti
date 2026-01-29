import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect } from 'amqplib';
// import * as amqp from 'amqplib';
import type { Channel, Connection, ChannelModel } from 'amqplib';

@Injectable()
export class queueService implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly config: ConfigService) { }
    private readonly logger = new Logger(queueService.name);

    private connection?: ChannelModel;
    private channel?: Channel;



    async onModuleInit() {
        const url = this.config.get<string>('MQ_URL');
        if (!url) throw new Error('MQ_URL is missing');

        this.logger.log(`Connecting MQ...`);
        this.connection = await connect(url);
        this.channel = await this.connection.createChannel();

        const exchange = this.config.get<string>('MQ_EXCHANGE');
        const type = this.config.get<string>('MQ_EXCHANGE_TYPE');

        await this.channel.assertExchange(exchange, type, { durable: true });

        this.logger.log(`MQ connected. Exchange="${exchange}" type="${type}"`);
    }

    async onModuleDestroy() {
        try {
            await this.channel?.close();
            await this.connection?.close();
            this.logger.log('MQ connection closed.');
        } catch (e) {
            this.logger.warn(`Error closing MQ: ${(e as Error).message}`);
        }
    }

    async publish(routingKey: string, payload: unknown) {
        if (!this.channel) throw new Error('MQ channel not initialized');

        const exchange = this.config.get<string>('MQ_EXCHANGE') ?? 'bms.events';

        const buffer = Buffer.from(JSON.stringify(payload));
        const ok = this.channel.publish(exchange, routingKey, buffer, {
            contentType: 'application/json',
            persistent: true,
            timestamp: Date.now(),
        });

        return ok;
    }
}
