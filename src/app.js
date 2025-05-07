import express,{json} from "express"
import {CreateRoutineRoutes} from "./routes/RoutineRoutes.js"
import {CreateExercisesRoutes} from "./routes/ExercisesRoutes.js"

export const createApp = ({ routineModel, exerciseModel }) => {
    const app = express();

    app.use(json());

    app.use("/routines", CreateRoutineRoutes({ routineModel }));

    app.use("/exercises", CreateExercisesRoutes({ exerciseModel }));

    const PORT = process.env.PORT ?? 1234;

    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`);
    });
}