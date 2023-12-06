import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {User} from "../entities/user.entity";
import {UsersService} from "../services/users.service";
import {CreateUserInput} from "../inputs/user-create.input";
import {UpdateUserInput} from "../inputs/user-update.input";

@Resolver('Users')
export class UsersResolver {
    constructor(
        private readonly userService: UsersService,
    ) {
    }

    @Mutation(() => User)
    async createUser(@Args('createUser') createUserInput: CreateUserInput): Promise<User> {
        return await this.userService.createUser(createUserInput)
    }

    @Mutation(() => User)
    async updateUser(@Args('updateUser') updateUserInput: UpdateUserInput): Promise<User> {
        return await this.userService.updateUser(updateUserInput)
    }

    @Mutation(() => Number)
    async removeUser(@Args('id') id: string): Promise<string> {
        return await this.userService.removeUser(id)
    }

    @Query(() => User)
    async getOneUser(@Args('id') id: string): Promise<User> {
        return await this.userService.getOneUser(id)
    }

    @Query(() => [ User ])
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers()
    }
}
