import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { AppGateway } from './app.gateway';


@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/Chat', { useNewUrlParser: true }),
        AuthModule,
        RoomsModule,
        MessagesModule,
    ],
    controllers: [],
    providers: [AppGateway],
})
export class AppModule {}
