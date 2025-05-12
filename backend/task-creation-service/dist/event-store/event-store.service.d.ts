import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';
export declare class EventStoreService {
    private readonly eventRepository;
    constructor(eventRepository: Repository<EventEntity>);
    save(event: {
        aggregateId: number;
        aggregateType: string;
        eventType: string;
        payload: any;
    }): Promise<EventEntity>;
    getEvents(aggregateId: number, aggregateType: string): Promise<EventEntity[]>;
}
