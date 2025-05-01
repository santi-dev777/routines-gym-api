import { ValidatePartialRoutine, ValidateRoutine } from "../schemas/Routine.js";

export class RoutineController{
    constructor ({routineModel}){
        this.RoutineModel = routineModel;
    }

    getAll = async (req,res) => {
        try{
            const routines = await this.RoutineModel.getAll();
            res.status(200).json(routines);
        }catch (e){
            res.status(500).json({error: e.message});
        }
    }

    getById = async (req,res) => {
        try{
            const routine = await this.RoutineModel.getById(req.params.id);
            if(routine) return res.status(200).json(routine);
            return res.status(404).json({error: 'Routine not found'});
        }catch (e){
            res.status(500).json({error: e.message});
        }
    }

    create = async (req,res) =>{
        try{
            const result = ValidateRoutine(req.body)
            if (!result.success) {
                return res.status(400).json({ error: result.error.message });
            }
            const routine = await this.RoutineModel.create({ input: result.data });
            return res.status(201).json(routine);
        }catch(e){
            res.status(500).json({error: e.message});
        }
    }

    delete = async (req,res) => {
        try{
            const { id } = req.params;

            const result = await this.RoutineModel.delete(id);
            
            if(!result) return res.status(404).json({ error:"Routine not found" });

            return res.status(200).json({ message: "Routine deleted successfully" });
        }catch(e){
            res.status(500).json({error: "error on delete"});
        }
    }

    update = async (req, res) => {
        try{
            const result = ValidatePartialRoutine(req.body)
            if(!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const routine = await this.RoutineModel.update({ id: req.params.id, input: result.data });

            if(!routine) return res.status(404).json({ error: "Routine not found" });

            return res.status(200).json(routine);
        } catch (e) {
            res.status(500).json({error: "error on update routine"});
        }
    }
}