import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findById(id: number) {
    const user = this.userRepository.find({ where: { id } });
    if (user) {
      throw `User with id: ${id} does't found. `;
    }

    return this.userRepository.find({ where: { id } });
  }

  create(user: User) {
    return this.userRepository.save(user);
  }

  deleteById(id: number) {
    return this.userRepository.delete(id);
  }
}
