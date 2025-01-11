import express from 'express';
import { SemesterRegistrationValidations } from './SemesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { validateRequest } from '../../middlwares/validateRequest';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidation,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistration);
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidation,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
