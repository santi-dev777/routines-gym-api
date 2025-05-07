import { Router } from "express";
import { ExercisesController } from "../controllers/ExercisesController.js";

export const CreateExercisesRoutes = ({ exerciseModel }) => {
    const router = Router();

    const exercisesController = new ExercisesController({ exerciseModel });

    router.get("/", exercisesController.getAll);

    router.get("/:id", exercisesController.getById);

    router.post("/", exercisesController.create);

    router.put("/:id", exercisesController.update);

    router.delete("/:id", exercisesController.delete);
    
    return router;
}