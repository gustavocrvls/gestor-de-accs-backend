import { getRepository, Like } from 'typeorm';
import { User } from '../../entities/User';
import { IIndexUserRequestDTO } from '../../modules/users/useCases/IndexUser/IndexUserDTO';
import { ILoginUserDTO } from '../../modules/users/useCases/LoginUser/LoginUserDTO';
import { IUpdateUserRequestDTO } from '../../modules/users/useCases/UpdateUser/UpdateUserDTO';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IGetByFieldData, IUsersRepository } from '../IUsersRepository';

export class MySQLUsersRepository implements IUsersRepository {
  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  async index(data: IIndexUserRequestDTO): Promise<IPaginatedArray> {
    const { profile, course, search, sortField, limit } = data;
    let { sortOrder, page } = data;

    const usersRepository = getRepository(User);
    let usersQuery = await usersRepository.createQueryBuilder('user');

    if (search)
      if (Number(search))
        usersQuery = usersQuery.where({ registration: Like(`%${search}%`) });
      else usersQuery = usersQuery.where({ name: Like(`%${search}%`) });

    if (profile)
      usersQuery = usersQuery.andWhere('user.profile = :profile', {
        profile,
      });

    if (course)
      usersQuery = usersQuery.andWhere('user.course = :course', {
        course,
      });

    if (!sortOrder) sortOrder = 'ASC';
    if (sortField)
      usersQuery = usersQuery.orderBy({
        [`user.${sortField}`]: sortOrder,
      });

    if (limit && limit !== undefined && page && page !== undefined) {
      if (page > 0) page -= 1;
      usersQuery = usersQuery.take(limit).skip(page * limit);
    }

    const users = await usersQuery
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.course', 'course')
      .select([
        'user.id',
        'user.name',
        'user.registration',
        'user.email',
        'user.username',
        'profile',
        'course',
      ])
      .getMany();

    const total_items = await usersQuery.getCount();

    return this.arrayPaginator.paginate(users, page + 1, limit, total_items);
  }

  async show(id: number): Promise<User> {
    const usersRepository = getRepository(User);

    const user = usersRepository.findOneOrFail(id, {
      relations: ['course', 'profile'],
      select: [
        'id',
        'name',
        'registration',
        'username',
        'email',
        'course',
        'profile',
      ],
    });

    return user;
  }

  async create(user: User): Promise<User> {
    const usersRepository = getRepository(User);

    const newUser = await usersRepository.save(user);

    return newUser;
  }

  async update(user: IUpdateUserRequestDTO): Promise<void> {
    const usersRepository = getRepository(User);

    await usersRepository.update({ id: user.id }, user);
  }

  async getByField(data: IGetByFieldData): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    const { field, param } = data;

    const user = await usersRepository.findOne({ [field]: param });

    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    const user = await usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.course', 'course')
      .where('username = :username', {
        username,
      })
      .getOne();

    return user;
  }
}
