import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://lenhatanh:huVRrYtJV9neKigP@nestjs.ite38.mongodb.net/'),
    ConfigModule.forRoot({
      isGlobal: true
    })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

