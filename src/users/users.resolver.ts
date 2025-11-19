import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { FindUserInput } from './dto/find-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Query(() => [User], { name: 'usersByFilters' })
  async findByFilters(@Args('filters') filters: FindUserInput): Promise<User[]> {
    return await this.usersService.findByFilters(filters);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return await this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string): Promise<boolean> {
    return await this.usersService.remove(id);
  }
}
