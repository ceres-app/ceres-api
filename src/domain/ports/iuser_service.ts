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
  findById(id: string): Promise<OptionalUser>;
  findByPasswordAndUsername(
    username: string,
    password: string,
  ): Promise<OptionalUser>;
  update(id: string, newUser: UserUpdateRequest): Promise<OptionalUser>;
}
