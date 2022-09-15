import { Response } from 'express';
import { UserService } from './user.service';

import { Controller, Get, Post, Render, Res, Req, Param } from '@nestjs/common';

@Controller('')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get('user')
    @Render('layout')
    async user() {
        const users = await this.userService.findAll();
        return { partialPage: 'user/index', users: users };
    }

    @Get('create-user')
    @Render('layout')
    async create() {
        return { partialPage: 'user/create' };
    }

    @Post('create-user')
    async createUser(@Req() req: any, @Res() res: Response) {
        if (await this.userService.create(req.body)) {
            res.redirect('/user');
        }
    }

    @Get('update-user/:id')
    @Render('layout')
    async update(@Param('id') id: number) {
        const user = await this.userService.findUserById(id);
        return { partialPage: 'user/update', user: user };
    }

    @Post('update-user')
    @Render('layout')
    async updateUser(@Req() req: any, @Res() res: Response) {
        if (await this.userService.update(req.body)) {
            return res.redirect('user');
        }
    }

    @Get('delete-user/:id')
    @Render('layout')
    async delete(@Param('id') id: number, @Res() res: Response) {
        if (await this.userService.delete(id)) {
            res.redirect('/user');
        }
    }
}
