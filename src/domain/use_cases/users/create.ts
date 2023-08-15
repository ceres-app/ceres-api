import { User, UserRequest } from '@/domain/entities/user';
import { HttpError } from '@/domain/exceptions/http_error';
import { IUserService } from '@/domain/ports/iuser_service';
import { UseCase } from '../iuse_case';

type Input = {
  newUser: UserRequest;
};

type Output = User;

export class Create implements UseCase<Input, Output> {
  constructor(private readonly userService: IUserService) {}

  async execute(input: Input): Promise<Output> {
    const { newUser } = input;
    const createdUser = await this.userService.create(newUser);
    if (!createdUser)
      throw new HttpError(
        `Usuário '${newUser.username}' não foi criado corretamente.`,
      );
    return createdUser;
  }
}
