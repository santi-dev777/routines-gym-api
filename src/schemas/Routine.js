import z from "zod";

export const RoutineSchema = z.object({
    name: z.string(),
    description: z.string(),
    total_duration_minutes: z.number(),
    is_public: z.boolean(),
    exercises: z.array(z.number()).optional()
})

export function ValidateRoutine(input){
    return RoutineSchema.safeParse(input);
}

export function ValidatePartialRoutine(input){
    return RoutineSchema.partial().safeParse(input);
}
