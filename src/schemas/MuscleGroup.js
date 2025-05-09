import z from "zod";

const muscle_groups = [
    "abdominales",
    "biceps",
    "cuadriceps",
    "espalda",
    "gluteos",
    "hombros",
    "isquiotibiales",
    "pantorrillas",
    "pecho",
    "triceps"
]

const validateMuscleGroup = z.object({
    name: z.enum(muscle_groups)
});

export function ValidateMuscleGroup(name){
    return validateMuscleGroup.safeParse({name});
}