import { Request, Response } from 'express';
import { IndexCourseUseCase } from './IndexCourseUseCase';

export class IndexCourseController {
  private indexCourseUseCase;

  constructor(indexCourseUseCase: IndexCourseUseCase) {
    this.indexCourseUseCase = indexCourseUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { sortField, sortOrder, nome } = request.query;

    try {
      const courses = await this.indexCourseUseCase.execute({
        sortField: <string>sortField,
        sortOrder: <'ASC' | 'DESC'>sortOrder,
        nome: <string>nome,
      });
      response.status(200).json({ courses });
    } catch (err) {
      console.error(err);
      response.sendStatus(400);
    }
  }
}