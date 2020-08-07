import {
    Controller,
    Get,
    HttpException,
    HttpStatus, Param,
    Query
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {

    constructor(private readonly usersService: UserService) {}


    @Get('/:id')
    async getUserById(@Param('id') id: string) {
        try {
            return await this.usersService.findById(id);
        } catch (err) {
            return new HttpException( 'Not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async getUserByEmail(@Query() query) {
        try {
            return await this.usersService.findByEmail(query.email)
        } catch (e) {
            return new HttpException( 'Not found', HttpStatus.NOT_FOUND);
        }
    }


    //
    // @Delete('/delete/:id')
    // async deleteuser(@Param() param) {
    //     try {
    //         await this.usersService.deleteUser(param.id);
    //         return new CommonResult(true, 'Successfully deleted');
    //     } catch (err) {
    //         return new CommonResult(true, 'Server error');
    //     }
    // }
    //
    // @Put('/edit/:id')
    // async editUser(@Req() request, @Param() param) {
    //     try {
    //         await this.usersService.updateUser(param.id,
    //             { username: request.body.username, password: request.body.password });
    //         return new CommonResult(true, 'Successfully edited');
    //     } catch (err) {
    //         return new CommonResult(true, 'Server error');
    //     }
    // }
}
