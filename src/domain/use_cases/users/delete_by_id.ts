import { User } from '@/domain/entities/user';
import { HttpError } from '@/domain/exceptions/http_error';
import { IUserService } from '@/domain/ports/iuser_service';
import { UseCase } from '../iuse_case';

type Input = {
  id: string;
};

type Output = User;

export class DeleteById implements UseCase<Input, Output> {
  constructor(private readonly userService: IUserService) {}

  async execute(input: Input): Promise<User> {
    const { id } = input;
    if (id === '') throw new HttpError('Informe um ID de usuário válido.');
    const deletedUser = await this.userService.deleteById(id);
    if (!deletedUser)
      throw new HttpError(`Não foi possível deletar usuário de ID ${id}.`);
    return deletedUser;
  }
}
