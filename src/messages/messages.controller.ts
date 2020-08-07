import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.interface';

@Controller('api/messages')
export class MessagesController {

    constructor(private readonly messagesService: MessagesService) {}

    @Post('create')
    save(@Body() message: Message) {
        try {
            return this.messagesService.create(message);
        } catch (err) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getAllMessagesFromRoom(@Query() query) {
        try {
            const allMessages = await this.messagesService.findAllMessages(query.roomId);
            return allMessages.sort((a, b) => {
                return (a.created ? new Date(a.created).getTime() : 0) - (b.created ? new Date(b.created).getTime() : 0);
            });
        } catch (err) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
        }
    }

}
