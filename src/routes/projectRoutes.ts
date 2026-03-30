import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post('/',
    body('projectName')
       .notEmpty().withMessage('El Nombre del Proyecto es requerido'),
    body('clientName')
       .notEmpty().withMessage('El Nombre del Cliente es requerido'),
    body('description')
       .notEmpty().withMessage('La Descripción del Proyecto es requerida'),
     handleInputErrors,
     ProjectController.createProject 
      )
router.get('/', ProjectController.getAllProjects)
router.get('/:id', 
   param('id').isMongoId().withMessage('El ID del Proyecto debe ser un ID de MongoDB válido'),
   handleInputErrors,
   ProjectController.getProjectById)

router.put('/:id', 
   param('id').isMongoId().withMessage('El ID del Proyecto debe ser un ID de MongoDB válido'),
   body('projectName')
       .notEmpty().withMessage('El Nombre del Proyecto es requerido'),
    body('clientName')
       .notEmpty().withMessage('El Nombre del Cliente es requerido'),
    body('description')
       .notEmpty().withMessage('La Descripción del Proyecto es requerida'),
   handleInputErrors,
   ProjectController.updateProject)

router.delete('/:id', 
   param('id').isMongoId().withMessage('El ID del Proyecto debe ser un ID de MongoDB válido'),
   handleInputErrors,
   ProjectController.deleteProject)

export default router;