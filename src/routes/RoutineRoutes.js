import {Router} from "express";
import {RoutineController} from "../controllers/RoutineController.js";

export const CreateRoutineRoutes = ({ routineModel }) => {
    const router = Router();

    const routineController = new RoutineController({ routineModel });

    router.get("/", routineController.getAll);

    router.get("/:id", routineController.getById);

    router.post("/", routineController.create);

    router.delete("/:id", routineController.delete)

    router.patch("/:id", routineController.update);

    return router;
}
