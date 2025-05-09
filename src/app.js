import express,{json} from "express"
import {CreateRoutineRoutes} from "./routes/RoutineRoutes.js"
import {CreateExercisesRoutes} from "./routes/ExercisesRoutes.js"
import {CreateMuscleGroupRoutes} from "./routes/MuscleGroupRoutes.js"

export const createApp = ({ routineModel, exerciseModel, muscleGroupModel }) => {
    const app = express();

    app.use(json());

    app.use("/routines", CreateRoutineRoutes({ routineModel }));

    app.use("/exercises", CreateExercisesRoutes({ exerciseModel }));

    app.use("/muscle-groups", CreateMuscleGroupRoutes({ muscleGroupModel }));

    const PORT = process.env.PORT ?? 1234;

    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`);
    });
}