import {createApp} from "./app.js";
import {RoutineModel} from "./models/Routine.js";
import {ExerciseModel} from "./models/Exercises.js";

createApp({ routineModel: RoutineModel, exerciseModel: ExerciseModel })