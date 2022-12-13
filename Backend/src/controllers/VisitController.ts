import { GetVisitPrarameters } from '../dtos/dto';
import MedicalActivityRepository from '../services/repositories/MedicalActivityRepository';
import VisitRepository from '../services/repositories/VisitRepository';


//const VisitRepository = require('../models/repositories/VisitRepository');


class VisitController{

    visitRepository:VisitRepository;
    medicalActivityRepository:MedicalActivityRepository;
    constructor(visitRepository:VisitRepository,medicalActivityRepsoitory:MedicalActivityRepository){
        this.visitRepository=visitRepository;
        this.medicalActivityRepository=medicalActivityRepsoitory;
    }

    getVisit=async(req, res)=>{
        const VisitId=req.params.VisitId;
    
        const results = await this.visitRepository.getVisit(VisitId);
    
        if (results instanceof Error) {
            return res.status(500).json({});
        } else if (!results || null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };
    
    getVisits=async(req, res)=>{
        const parameters: GetVisitPrarameters = {
            AnimalId: req.query.AnimalId as any,
            VetId: req.query.VetId as any,   
            OwnerId: req.query.OwnerId as any
          
            
        };
    
        const results = await this.visitRepository.getVisits(parameters);
    
        if (results instanceof Error) {
            return res.status(500).json({});
        } else if (!results || null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };
    
    searchVisits=async(req,res)=>{
        const parameters={
            Email:req.query.Email,
            Name:req.query.Name,
            Date:req.query.Date,
            OwnerId:req.query.OwnerId,
          
        };
    
        const results= await this.visitRepository.searchVisits(parameters);
    
        if (results instanceof Error) {
            return res.status(500).json({});
        } else if (!results || null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    
    };
    
    
    
    registerVisit=async(req, res)=>{
        const Visist = req.body;
        const results = await this.visitRepository.createVisit(Visist);
        if (results instanceof Error) {
            return res.status(500).json({});
        } else return res.status(201).json({ newId: results });
    };

    getVisitActivities=async(req, res)=>{
        const results = await this.medicalActivityRepository.getMedicalActivities();
    
        if (results instanceof Error) {
            return res.status(500).json({ results });
        } else return res.status(200).json(results);
    };
    

}
export default VisitController;
