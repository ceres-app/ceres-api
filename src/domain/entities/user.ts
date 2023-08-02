export interface User {
  id: string;
  username: string;
  password: string;
}

export type OptionalUser = User | null | undefined;

export type UserRequest = Pick<User, 'username' | 'password'>;

export type UserUpdateRequest = Partial<UserRequest>;
