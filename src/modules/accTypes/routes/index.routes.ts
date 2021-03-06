import { Router } from 'express';
import { PROFILE } from '../../../constants/Profile';
import { verifyToken } from '../../../middlewares/auth';
import { createACCTypeController } from '../useCases/CreateACCType';
import { deleteACCTypeController } from '../useCases/DeleteACCType';
import { indexACCTypeController } from '../useCases/IndexACCType';
import { indexACCTypesWithUserPointsController } from '../useCases/IndexACCTypesWithUserPoints';
import { showACCTypeController } from '../useCases/ShowACCType';
import { updateACCTypeController } from '../useCases/UpdateACCType';

const accTypesRoutes = Router();

// get all the acc types
accTypesRoutes.get(
  '/',
  verifyToken([PROFILE.STUDENT, PROFILE.ADMINISTRATOR]),
  (req, res) => indexACCTypeController.handle(req, res),
);

// get a specific acc type by id
accTypesRoutes.get('/:id', verifyToken([PROFILE.ADMINISTRATOR]), (req, res) =>
  showACCTypeController.handle(req, res),
);

// get all the acc types with the points of a specific user provided by the id of user
accTypesRoutes.get(
  '/user/:user_id',
  verifyToken([PROFILE.STUDENT]),
  (req, res) => indexACCTypesWithUserPointsController.handle(req, res),
);

// creates a new acc type
accTypesRoutes.post('/', verifyToken([PROFILE.ADMINISTRATOR]), (req, res) =>
  createACCTypeController.handle(req, res),
);

// delete a acc type by id
accTypesRoutes.delete(
  '/:id',
  verifyToken([PROFILE.ADMINISTRATOR]),
  (req, res) => deleteACCTypeController.handle(req, res),
);

// updates a acc type by the provided id
accTypesRoutes.put('/:id', verifyToken([PROFILE.ADMINISTRATOR]), (req, res) =>
  updateACCTypeController.handle(req, res),
);

export { accTypesRoutes };
