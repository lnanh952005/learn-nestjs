import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()//model
export class User extends Document {
    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop()
    fullname: string;

    @Prop()
    age: number;

    @Prop()
    phone: number;

    @Prop()
    address: string;

    @Prop()
    createdAt: Date;

    @Prop({default: Date.now})
    updatedAt: Date;
}
// Tạo schema từ class
export const UserSchema = SchemaFactory.createForClass(User);