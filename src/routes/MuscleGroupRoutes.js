import {Router} from "express";
import { MuscleGroupController } from "../controllers/MuscleGroupController.js";

export const CreateMuscleGroupRoutes = ({ muscleGroupModel }) => {
    const router = Router();

    const muscleGroupController = new MuscleGroupController({ muscleGroupModel });

    router.get("/", muscleGroupController.getAll);

    router.get("/:id", muscleGroupController.getById);

    router.post("/", muscleGroupController.create);

    router.delete("/:id", muscleGroupController.delete)

    router.patch("/:id", muscleGroupController.update);

    return router;
}