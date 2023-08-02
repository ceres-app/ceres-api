import {
  OptionalUser,
  User,
  UserRequest,
  UserUpdateRequest,
} from '@/domain/entities/user';

export interface IUserService {
  create(newUser: UserRequest): Promise<OptionalUser>;
  deleteById(id: string): Promise<OptionalUser>;
  fetchAll(): Promise<User[]>;
  findByPasswordAndUsername(
    username: string,
    password: string,
  ): Promise<OptionalUser>;
  update(newUser: UserUpdateRequest): Promise<OptionalUser>;
}
