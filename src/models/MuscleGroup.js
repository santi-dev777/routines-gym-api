import {pool} from "../database/database.js";

export class MuscleGroupModel{
    static async getAll(){
        const [muscleGroups] = await pool.query(`
            SELECT * FROM muscle_groups
        `);
        return muscleGroups;
    }

    static async getById(id){
        const [muscleGroup] = await pool.query(
            `SELECT * FROM muscle_groups WHERE id = ?`,
            [id]);

        if(muscleGroup.length === 0) return null;
        return muscleGroup[0];
    }

    static async create({input}){
        const{
            name
        } = input;

        const [muscleGroup] = await pool.query(`
            INSERT INTO muscle_groups (name)
            VALUES (?)
        `,[name]);

        return this.getById(muscleGroup.insertId);
    }

    static async update({id, input}){
        const{
            name
        } = input;

        const [muscleGroup] = await pool.query(`
            UPDATE muscle_groups
            SET name = IFNULL(?, name)
            WHERE id = ?
        `,[name, id]);

        return this.getById(id);
    }

    static async delete(id){
        const [muscleGroup] = await pool.query(`
            DELETE FROM muscle_groups WHERE id = ?`, 
            [id]);
        if(muscleGroup.affectedRows <= 0) return null;
        return true;
    }
}