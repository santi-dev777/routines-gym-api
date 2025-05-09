import { ValidateMuscleGroup } from "../schemas/MuscleGroup.js";

export class MuscleGroupController{
    constructor({muscleGroupModel}){
        this.MuscleGroupModel = muscleGroupModel;
    }

    getAll = async (req,res) => {
        try{
            const muscleGroups = await this.MuscleGroupModel.getAll();
            res.status(200).json(muscleGroups);
        }catch (e){
            res.status(500).json({error: e.message});
        }
    }

    getById = async (req,res) => {
        try{
            const muscleGroup = await this.MuscleGroupModel.getById(req.params.id);
            if(muscleGroup) return res.status(200).json(muscleGroup);
            return res.status(404).json({error: 'Muscle group not found'});
        } catch(e){
            res.status(500).json({error: e.message});
        }
    }

    create = async (req,res) => {
        try{
            const result = ValidateMuscleGroup(lowerCase(req.body.name))
            if (!result.success) {
                return res.status(400).json({ error: result.error.message });
            }
            const muscleGroup = await this.MuscleGroupModel.create({ input: result.data });
            return res.status(201).json(muscleGroup);
        }catch(e){
            res.status(500).json({error: e.message});
        }
    }

    update = async (req,res) => {
        try{
            const result = ValidateMuscleGroup(lowerCase(req.body.name))
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const muscleGroup = await this.MuscleGroupModel.update({ id: req.params.id, input: result.data });
            
            if(!muscleGroup) return res.status(404).json({ error: 'Muscle group not found' });
            
            return res.status(200).json(muscleGroup);
        }catch(e){
            res.status(500).json({error: e.message});
        }
    }

    delete = async (req,res) => {
        try{
            const { id } = req.params;

            const result = await this.MuscleGroupModel.delete(id);
            
            if(!result) return res.status(404).json({ error:"Muscle group not found" });

            return res.status(200).json({ message: "Muscle group deleted successfully" });
        }catch(e){
            res.status(500).json({error: "error on delete"});
        }
    }
}