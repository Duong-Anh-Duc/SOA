export declare class EventEntity {
    id: number;
    aggregateId: number;
    aggregateType: string;
    eventType: string;
    payload: any;
    createdAt: Date;
}
