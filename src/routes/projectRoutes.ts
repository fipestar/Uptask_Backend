import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

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

/**Routes for tasks */
router.param('projectId', validateProjectExists)
router.post('/:projectId/tasks',
     body('name')
        .notEmpty().withMessage('El Nombre de la Tarea es requerido'),
     body('description')
        .notEmpty().withMessage('La Descripción de la Tarea es requerida'),
      handleInputErrors,
     TaskController.createTask
)
router.get('/:projectId/tasks',
      TaskController.getProjectTasks
   )

router.get('/:projectId/tasks/:taskId',
      param('taskId').isMongoId().withMessage('El ID de la Tarea debe ser un ID de MongoDB válido'),
      handleInputErrors,
      TaskController.getTaskById
   )
router.put('/:projectId/tasks/:taskId',
   param('taskId').isMongoId().withMessage('El ID de la Tarea debe ser un ID de MongoDB válido'),
   body('name')
      .notEmpty().withMessage('El Nombre de la Tarea es requerido'),
   body('description')
      .notEmpty().withMessage('La Descripción de la Tarea es requerida'),
   handleInputErrors,
   TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
   param('taskId').isMongoId().withMessage('El ID de la Tarea debe ser un ID de MongoDB válido'),
   handleInputErrors,
   TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
   param('taskId').isMongoId().withMessage('El ID de la Tarea debe ser un ID de MongoDB válido'),
   body('status').notEmpty().withMessage('El estado de la tarea es requerido'),
   handleInputErrors,
   TaskController.updateStatus
)

export default router;