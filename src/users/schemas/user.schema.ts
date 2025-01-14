import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { IsEmail } from "class-validator";
import mongoose, { Document } from 'mongoose';

@Schema({timestamps: true})//model
export class User extends Document {
    
    @IsEmail()
    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop()
    fullname: string;

    @Prop()
    age: number;

    @Prop()
    gender: string;

    @Prop()
    phone: number;

    @Prop()
    address: string;

    @Prop({type: Object})
    company: {
        _id: mongoose.Schema.Types.ObjectId,
        name: string
    }

    @Prop()
    role: string;

    @Prop()
    refreshToken: string;

    @Prop({default: false})
    deleted: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;
}
// Tạo schema từ class
export const userSchema = SchemaFactory.createForClass(User);