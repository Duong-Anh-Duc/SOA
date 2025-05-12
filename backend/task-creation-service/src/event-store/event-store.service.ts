import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';

@Injectable()
export class EventStoreService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async save(event: { aggregateId: number; aggregateType: string; eventType: string; payload: any }) {
    const eventEntity = this.eventRepository.create({
      aggregateId: event.aggregateId,
      aggregateType: event.aggregateType,
      eventType: event.eventType,
      payload: event.payload,
    });
    return this.eventRepository.save(eventEntity);
  }

  async getEvents(aggregateId: number, aggregateType: string) {
    return this.eventRepository.find({
      where: { aggregateId, aggregateType },
      order: { createdAt: 'ASC' },
    });
  }
}