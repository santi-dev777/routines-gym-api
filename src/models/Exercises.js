import {pool} from "../database/database.js";

export class ExerciseModel{
    static async getAll(){
        const [exercises] = await pool.query(`
            SELECT * FROM exercises
        `);
        return exercises;
    }

    static async getById(id){
        const [exercise] = await pool.query(
            `SELECT * FROM exercises WHERE id = ?`,
            [id]);

        if(exercise.length === 0) return null;
        return exercise[0];
    }

    static async create({input}){
        const{
            name,
            short_description,
            technique,
            rest_seconds,
            muscle_group_id
        } = input;

        //Validar que el muscle_group_id exista
        
        await this.#validateMuscleGroupId(muscle_group_id);

        //Insertar el ejercicio con el muscle_group_id validado

        const [exercise] = await pool.query(`
            INSERT INTO exercises (name, short_description, technique, rest_seconds, muscle_group_id)
            VALUES (?, ?, ?, ?, ?)
        `,[name, short_description, technique, rest_seconds, muscle_group_id]);
        
        return this.getById(exercise.insertId);
    }

    static async update({id, input}){
        const{
            name,
            short_description,
            technique,
            rest_seconds,
            muscle_group_id
        } = input;
        
        //Validar que el muscle_group_id exista
        
        if(muscle_group_id){
            await this.#validateMuscleGroupId(muscle_group_id);
        }

        const [exercise] = await pool.query(`
            UPDATE exercises 
            SET name = IFNULL(?, name), 
                short_description = IFNULL(?, short_description), 
                technique = IFNULL(?, technique), 
                rest_seconds = IFNULL(?, rest_seconds), 
                muscle_group_id = IFNULL(?, muscle_group_id) 
            WHERE id = ?
        `,[name, short_description, technique, rest_seconds, muscle_group_id, id]);
        return exercise;
    }

    static async delete(id){
        const [exercise] = await pool.query(`
            DELETE FROM exercises WHERE id = ?
        `,[id]);
        return exercise;
    }

    static async #validateMuscleGroupId(muscleGroupId){
        const [muscleGroup] = await pool.query(`
            SELECT * FROM muscle_groups WHERE id = ?
        `,[muscleGroupId]);

        if(muscleGroup.length === 0){
            throw new Error('El muscle_group_id no existe');
        }
    }
}


