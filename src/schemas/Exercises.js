import z from "zod";

export const ExerciseSchema = z.object({
    name: z.string(),
    short_description: z.string(),
    technique: z.string(),
    img_url: z.string().optional().nullable(),
    rest_seconds: z.number().optional().nullable(),
    muscle_group_id: z.number()
})

export function ValidateExercise(input){
    return ExerciseSchema.safeParse(input);
}

export function ValidatePartialExercise(input){
    return ExerciseSchema.partial().safeParse(input);
}
