import { User } from '@/domain/entities/user';
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
    if (id === '') throw new Error('Informe um ID de usuário válido.');
    const deletedUser = await this.userService.deleteById(id);
    if (!deletedUser)
      throw new Error(`Não foi possível deletar usuário de ID ${id}.`);
    return deletedUser;
  }
}
