/**
 * @author Gustavo Carvalho Silva
 * @since 19/11/2020
 * 
 */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import TipoDeAcc from '../models/TipoDeAcc';
import tipoDeAccView from '../views/tipo_de_acc_view';
import * as Yup from 'yup';

export default {

  /**
   * @author Gustavo Carvalho Silva
   * @since 19/11/2020
   * 
   * @description retorna um objeto contendo todos os Tipos de ACC presentes no banco de dados
   */
  async index(req: Request, res: Response) {
    const tipoDeAccRepository = getRepository(TipoDeAcc);

    const tiposDeAcc = await tipoDeAccRepository.find({
      relations: ['unidade_de_medida']
    });

    return res.json(tipoDeAccView.renderMany(tiposDeAcc));
  },

   /**
   * @author Gustavo Carvalho Silva
   * @since 14/11/2020
   * 
   * @description cria um novo Tipo de ACC com os parametros recebidos no corpo da requisição
   * 
   * corpo da requisição (req): 
   *  nome: string,
   *  pontosPorUnidade: number,
   *  limiteDePontos: number,
   *  sobre: string,
   *  unidadeDeMedida: number,
   *  curso: number
   */
  async create(req: Request, res: Response) {
    const {
      nome,
      pontosPorUnidade,
      limiteDePontos,
      sobre,
      unidadeDeMedida,
    } = req.body;

    const tipoDeAccRepository = getRepository(TipoDeAcc);

    const data = {
      nome,
      pontos_por_unidade: pontosPorUnidade,
      limite_de_pontos: limiteDePontos,
      sobre,
      unidade_de_medida: unidadeDeMedida,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      pontos_por_unidade: Yup.number().required(),
      limite_de_pontos: Yup.number().required(),
      sobre: Yup.string().optional().max(300),
      unidade_de_medida: Yup.number().required(),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const tipoDeAcc = tipoDeAccRepository.create(data);

    await tipoDeAccRepository.save(tipoDeAcc);

    return res.status(201).json(tipoDeAcc);
  }
}
