import express,{json} from "express"
import {createRoutineRoutes} from "./routes/RoutineRoutes.js"

export const createApp = ({ routineModel }) => {
    const app = express();

    app.use(json());

    app.use("/api/routines", createRoutineRoutes({ routineModel }));

    const PORT = process.env.PORT ?? 1234;

    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`);
    });
}