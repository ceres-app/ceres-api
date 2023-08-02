import { User, UserUpdateRequest } from '@/domain/entities/user';
import { IUserService } from '@/domain/ports/iuser_service';
import { UseCase } from '../iuse_case';

type Input = {
  id: string;
  newUser: UserUpdateRequest;
};

type Output = User;

export class Update implements UseCase<Input, Output> {
  constructor(private readonly userService: IUserService) {}

  async execute(input: Input): Promise<User> {
    const { id, newUser } = input;
    const updatedUser = await this.userService.update(id, newUser);
    if (!updatedUser) throw new Error(`Usuário ${id} não foi atualizado.`);
    return updatedUser;
  }
}
