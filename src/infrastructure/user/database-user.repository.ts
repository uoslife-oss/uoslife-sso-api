import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UniqueKeys, User, UserRepository } from '@domain/user';
import { UserEntity } from '@infrastructure/user/user.entity';
import { UserNotFoundError } from '@infrastructure/user/user.errors';

export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .andWhere('user.deletedAt IS NULL')
      .leftJoinAndSelect('user.verifications', 'verifications')
      .getOne();

    if (!user) throw new UserNotFoundError();

    return new User(user);
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .andWhere('deletedAt IS NULL')
      .leftJoinAndSelect('user.verifications', 'verifications')
      .getOne();

    if (!user) throw new UserNotFoundError();

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

  async updateProfile(user: User): Promise<boolean> {
    const userEntityUpdateQueryBuilder = this.userRepository
      .createQueryBuilder('user')
      .update()
      .where('id = :id', { id: user.id })
      .andWhere('deletedAt IS NULL')
      .set(user);

    const { affected } = await userEntityUpdateQueryBuilder.execute();

    return affected > 0;
  }

  async withdraw(id: string): Promise<boolean> {
    const { affected } = await this.userRepository
      .createQueryBuilder('user')
      .softDelete()
      .where('id = :id', { id })
      .andWhere('deletedAt IS NULL')
      .execute();

    return affected > 0;
  }

  async checkDuplicated(key: UniqueKeys, value: string): Promise<boolean> {
    const count = await this.userRepository
      .createQueryBuilder('user')
      .where(`user.${key} = :value`, { value })
      .andWhere('user.deletedAt IS NULL')
      .getCount();

    return count > 0;
  }
}
