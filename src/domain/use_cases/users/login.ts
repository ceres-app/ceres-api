import { User } from '@/domain/entities/user';
import { HttpError } from '@/domain/exceptions/http_error';
import { IUserService } from '@/domain/ports/iuser_service';
import { UseCase } from '../iuse_case';

type Input = {
  username: string;
  password: string;
};

type Output = User;

export class Login implements UseCase<Input, Output> {
  constructor(private readonly userService: IUserService) {}

  async execute(input: Input): Promise<User> {
    const { username, password } = input;
    const foundUser = await this.userService.findByPasswordAndUsername(
      username,
      password,
    );
    if (!foundUser) throw new HttpError(`Usuário ou senha incorretos.`);
    return foundUser;
  }
}
