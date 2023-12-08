import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UserCreate } from '../dto/user.create.dto';
import { UserUpdate } from '../dto/user.update.dto';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'dto', type: () => UserCreate })
    userCreate: UserCreate,
  ): Promise<User> {
    return await this.userService.createUser(userCreate);
  }

  @Mutation(() => User)
  async updateUser(
    @Args({ name: 'dto', type: () => UserUpdate })
    userUpdate: UserUpdate,
  ): Promise<User> {
    return await this.userService.updateUser(userUpdate);
  }

  @Mutation(() => Number)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.userService.removeUser(id);
  }

  @Query(() => User)
  async getOneUser(@Args('id') id: number): Promise<User> {
    return await this.userService.getOneUser(id);
  }
}
