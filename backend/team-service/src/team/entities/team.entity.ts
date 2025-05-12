import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true}) 
export class Team extends Document {
  @Prop({ required: true })
  declare id: number; 

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  adminId: number;

  @Prop({ type: [Number], default: [] })
  memberIds: number[];

  @Prop({ type: [Number], default: [] })
  taskIds: number[];

  createdAt: Date;
  updatedAt: Date;
}

export const TeamSchema = SchemaFactory.createForClass(Team);