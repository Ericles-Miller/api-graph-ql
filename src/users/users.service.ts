import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindUserInput } from './dto/find-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const emailExists = await this.usersRepository.findOne({
      where: { email: createUserInput.email },
    });

    if (emailExists) throw new BadRequestException('Email already in use');

    const user = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByFilters(filters: FindUserInput): Promise<User[]> {
    const whereCondition: Partial<User> = {};

    if (filters.id) whereCondition.id = filters.id;
    if (filters.email) whereCondition.email = filters.email;
    if (filters.phone) whereCondition.phone = filters.phone;
    if (filters.name) whereCondition.name = filters.name;
    if (filters.isActive !== undefined) whereCondition.isActive = filters.isActive;

    return this.usersRepository.find({ where: whereCondition });
  }

  async update(id: string, { name, phone }: UpdateUserInput): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;

    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.remove(user);
    return true;
  }
}
