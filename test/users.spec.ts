import { MongoDBUserService } from '@/api/services/mongodb/user.service';
import { Create } from '@/domain/use_cases/users/create';
import { generateMockName } from './common/generate_mock_name';

const userService = new MongoDBUserService();

describe('Users (Use Cases)', () => {
  it('Should create a new user', async () => {
    const createUC = new Create(userService);
    const username = generateMockName();
    const password = generateMockName();

    const createdUser = await createUC.execute({
      newUser: {
        username,
        password,
      },
    });

    expect(createdUser.id).toBeTruthy();
    expect(createdUser.username).toBe(username);
    expect(createdUser.password).toBe(password);
  });
});
