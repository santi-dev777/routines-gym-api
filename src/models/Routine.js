import {pool} from "../database/database.js";

export class RoutineModel{

    static async getAll(){
        const [routines] = await pool.query(`
            SELECT 
            r.id,
            r.name,
            r.description,
            r.total_duration_minutes,
            r.is_public,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', e.id,
                'name', e.name,
                'short_description', e.short_description,
                'technique', e.technique,
                'rest_seconds', e.rest_seconds,
                'muscle_group', mg.name
                )
            ) AS exercises
            FROM routines r
            JOIN routine_exercises re ON r.id = re.routine_id
            JOIN exercises e ON re.exercise_id = e.id
            JOIN muscle_groups mg ON e.muscle_group_id = mg.id
            GROUP BY r.id, r.name, r.description, r.total_duration_minutes, r.is_public
        `);
        return routines;
    }

    static async getById(id){
        const [routine] = await pool.query(`
            SELECT 
            r.id,
            r.name,
            r.description,
            r.total_duration_minutes,
            r.is_public,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', e.id,
                'name', e.name,
                'short_description', e.short_description,
                'technique', e.technique,
                'rest_seconds', e.rest_seconds,
                'muscle_group', mg.name
                )
            ) AS exercises
            FROM routines r
            JOIN routine_exercises re ON r.id = re.routine_id
            JOIN exercises e ON re.exercise_id = e.id
            JOIN muscle_groups mg ON e.muscle_group_id = mg.id
            WHERE r.id = ?
            GROUP BY r.id, r.name, r.description, r.total_duration_minutes, r.is_public`, 
            [id]);

        if(routine.length === 0) return null;

        return routine[0];
    }

    static async create({input}){
        const {
            name,
            description,
            total_duration_minutes,
            is_public,
            exercises
        } = input;

        const [result] = await pool.query(
            `INSERT INTO routines (name, description, total_duration_minutes, is_public)
             VALUES (?, ?, ?, ?)`,
            [name, description, total_duration_minutes, is_public]
          );

        const routineId = result.insertId;

        if(Array.isArray(exercises)){
            await this.#validateExerciseIds(exercises);

            const inserts = exercises.map((exerciseId, index) => [
                routineId,
                exerciseId,
                index + 1 // posición
              ]);
          
            await pool.query(
                `INSERT INTO routine_exercises (routine_id, exercise_id, position) VALUES ?`,
                [inserts]
            );
        }

        return this.getById(routineId);
    }

    static async delete(id){
        const [result] = await pool.query(
            `DELETE FROM routines WHERE id = ?`, 
            [id]);
        if(result.affectedRows <= 0) return null;

        return true;
    }

    static async update({id, input}){
        const {
            name,
            description,
            total_duration_minutes,
            is_public,
            exercises
        } = input;

        const [result] = await pool.query(
            `UPDATE routines 
            SET name = IFNULL(?, name), 
                description = IFNULL(?, description), 
                total_duration_minutes = IFNULL(?, total_duration_minutes), 
                is_public = IFNULL(?, is_public) 
            WHERE id = ?`,
            [name, description, total_duration_minutes, is_public, id]
        );

        if(result.affectedRows <= 0) return null;

        if(Array.isArray(exercises)){
            await this.#validateExerciseIds(exercises);

            await pool.query("DELETE FROM routine_exercises WHERE routine_id = ?", [id])

            const inserts = exercises.map((exerciseId, index) => [
                id,
                exerciseId,
                index + 1 // posición
            ]);

            await pool.query(
                `INSERT INTO routine_exercises (routine_id, exercise_id, position) VALUES ?`,
                [inserts]
            );
        }

        return this.getById(id);
    }

    static async #validateExerciseIds(exerciseIds) {
        if (!Array.isArray(exerciseIds) || exerciseIds.length === 0) {
            throw new Error('La lista de ejercicios está vacía o no es válida');
        }
    
        const [validExercises] = await pool.query(
            `SELECT id FROM exercises WHERE id IN (?)`,
            [exerciseIds]
        );
    
        if (validExercises.length !== exerciseIds.length) {
            throw new Error('Uno o más ejercicios no existen');
        }
    }

    static async getRoutineMuscle(muscle_group_id){
        const [routines] = await pool.query(
            `SELECT 
            r.id,
            r.name,
            r.description,
            r.total_duration_minutes,
            r.is_public,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', e.id,
                    'name', e.name,
                    'short_description', e.short_description,
                    'technique', e.technique,
                    'rest_seconds', e.rest_seconds,
                    'muscle_group', mg.name
                )
            ) AS exercises
            FROM routines r
            JOIN routine_exercises re ON r.id = re.routine_id
            JOIN exercises e ON re.exercise_id = e.id
            JOIN muscle_groups mg ON e.muscle_group_id = mg.id
            WHERE r.id IN (
                SELECT r2.id
                FROM routines r2
                JOIN routine_exercises re2 ON r2.id = re2.routine_id
                JOIN exercises e2 ON re2.exercise_id = e2.id
                WHERE e2.muscle_group_id = ?
            )
            GROUP BY r.id, r.name, r.description, r.total_duration_minutes, r.is_public`, 
        [muscle_group_id]);

        if(routines.length === 0) return null;

        return routines;
    }
    
}

