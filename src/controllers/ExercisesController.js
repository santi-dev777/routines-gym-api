import { ValidatePartialExercise, ValidateExercise } from "../schemas/Exercises.js";

export class ExercisesController{
    constructor({exerciseModel}){
        this.ExerciseModel = exerciseModel;
    }

    getAll = async (req,res) => {
        try{
            const exercises = await this.ExerciseModel.getAll();
            res.status(200).json(exercises);
        }catch (e){
            res.status(500).json({error: e.message});
        }
    }

    getById = async (req,res) => {
        try{
            const exercise = await this.ExerciseModel.getById(req.params.id);
            if(exercise) return res.status(200).json(exercise);
            return res.status(404).json({error: 'Exercise not found'});
        }catch (e){
            res.status(500).json({error: e.message});
        }
    }

    create = async (req,res) => {
        try{
            const result = ValidateExercise(req.body)
            if (!result.success) {
                return res.status(400).json({ error: result.error.message });
            }
            const exercise = await this.ExerciseModel.create({ input: result.data });
            return res.status(201).json(exercise);
        }catch(e){
            res.status(500).json({error: e.message});
        }
    }

    update = async (req, res) => {
        try{
            const result = ValidatePartialExercise(req.body)
            if(!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const exercise = await this.ExerciseModel.update({ id: req.params.id, input: result.data });

            if(!exercise) return res.status(404).json({ error: "Exercise not found" });

            return res.status(200).json(exercise);
        } catch (e) {
            res.status(500).json({error: "error on update exercise"});
        }
    }

    delete = async (req,res) => {
        try{
            const { id } = req.params;

            const result = await this.ExerciseModel.delete(id);
            
            if(!result) return res.status(404).json({ error:"Exercise not found" });

            return res.status(200).json({ message: "Exercise deleted successfully" });
        }catch(e){
            res.status(500).json({error: "error on delete"});
        }
    }
}