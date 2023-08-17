import { MongoDBUserService } from '@/api/services/mongodb/user.service';
import { UserRequest } from '@/domain/entities/user';
import { Create } from '@/domain/use_cases/users/create';
import { FetchAll } from '@/domain/use_cases/users/fetch_all';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('/users')
export class UserController {
  @Get('/')
  async fecthAll() {
    const fecthAllUC = new FetchAll(new MongoDBUserService());
    const allUsers = await fecthAllUC.execute();
    return allUsers;
  }

  @Post('/')
  async create(@Body() newUser: UserRequest) {
    const createUC = new Create(new MongoDBUserService());
    const createdUser = await createUC.execute({
      newUser,
    });
    return createdUser;
  }
}
