import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './room.interface';
import { ObjectID } from 'bson';
import { UserService } from '../users/user.service';

@Controller('api/rooms')
export class RoomsController {
    constructor( private readonly roomsService: RoomsService) {}

    @Get('/:id')
    findById(@Param('id') id: ObjectID) {
        return this.roomsService.findById(id);
    }

    @Get()
    async getAllRooms(@Query() query) {
        try {
            const allRooms = await this.roomsService.findAllRooms(query.userId);
            return allRooms.sort((a, b) => {
                return (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0);
            });
        } catch (err) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('create')
    save(@Body() room: Room) {
        try {
            return this.roomsService.create(room);
        } catch (err) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
        }
    }

    @Put('/:id/add-user')
    addUser(@Param('id') roomId: ObjectID, @Body() body) {
        try {
            return this.roomsService.addUser(roomId, body.userId);
        } catch (err) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
        }
    }
}
