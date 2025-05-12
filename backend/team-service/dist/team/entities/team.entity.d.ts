import { Document } from 'mongoose';
export declare class Team extends Document {
    id: number;
    name: string;
    adminId: number;
    memberIds: number[];
    taskIds: number[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const TeamSchema: import("mongoose").Schema<Team, import("mongoose").Model<Team, any, any, any, Document<unknown, any, Team, any> & Team & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Team, Document<unknown, {}, import("mongoose").FlatRecord<Team>, {}> & import("mongoose").FlatRecord<Team> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
