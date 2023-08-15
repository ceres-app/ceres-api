import { User } from '@/domain/entities/user';
import { IUserService } from '@/domain/ports/iuser_service';
import { UseCaseWithoutInput } from '../iuse_case';

type Output = User[];

export class FetchAll implements UseCaseWithoutInput<Output> {
  constructor(private readonly userService: IUserService) {}

  async execute(): Promise<Output> {
    return this.userService.fetchAll();
  }
}
