import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async findOne(username: string): Promise<any> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async totalUser(): Promise<number> {
    return await this.userRepository.count();
  }

  async findUserById(id: number): Promise<any> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return await this.userRepository.save(user);
  }


  async update(user: User): Promise<UpdateResult> {
    if (user.password != '') {
      user.password = await bcrypt.hash(user.password, 10);
    } else {
      const oldPassword = await this.findUserById(user.id);
      user.password = oldPassword.password;
    }
    return await this.userRepository.update(user.id, user);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

}
