import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserRepository } from '@domain/user';
import { UserEntity } from '@infrastructure/user/user.entity';

export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.verifications', 'verifications')
      .getOneOrFail();

    return new User(user);
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .leftJoinAndSelect('user.verifications', 'verifications')
      .getOneOrFail();

    return new User(user);
  }

  async register(user: User): Promise<string> {
    const { identifiers } = await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .values(user)
      .execute();

    return identifiers[0].id;
  }

  async updateUser(user: User): Promise<boolean> {
    const { affected } = await this.userRepository
      .createQueryBuilder('user')
      .update()
      .where('user.id = :id', { id: user.id })
      .set(user)
      .execute();

    return affected > 0;
  }

  async withdraw(id: string): Promise<boolean> {
    const { affected } = await this.userRepository
      .createQueryBuilder('user')
      .softDelete()
      .where('user.id = :id', { id })
      .execute();

    return affected > 0;
  }
}
