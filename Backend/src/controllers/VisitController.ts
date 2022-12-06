import { GetVisitPrarameters } from '../models/classes/Interfaces';


const VisitRepository = require('../models/repositories/VisitRepository');
const VisitMedicalActivitiesRepository=require('../models/repositories/MedicalActivityRepository');


export const getVisit=async (req, res) => {
    const VisitId=req.params.VisitId;

    const results = await VisitRepository.getVisit(VisitId);

    if (results instanceof Error) {
        return res.status(500).json({});
    } else if (!results || null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};

export const getVisits=async (req, res) => {
    const parameters: GetVisitPrarameters = {
        AnimalId: req.query.AnimalId as any,
        VetId: req.query.VetId as any,   
        OwnerId: req.query.OwnerId as any
      
        
    };

    const results = await VisitRepository.getVisits(parameters);

    if (results instanceof Error) {
        return res.status(500).json({});
    } else if (!results || null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};

export const searchVisits=async(req,res)=>{
    const parameters={
        Email:req.query.Email,
        Name:req.query.Name,
        Date:req.query.Date,
        OwnerId:req.query.OwnerId,
      
    };

    const results= await VisitRepository.searchVisits(parameters);

    if (results instanceof Error) {
        return res.status(500).json({});
    } else if (!results || null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);

};



export const registerVisit= async (req, res) => {
    const Visist = req.body;
    const results = await VisitRepository.createVisit(Visist);
    if (results instanceof Error) {
        return res.status(500).json({});
    } else return res.status(201).json({ newId: results });
};



export const getVisitActivities=async (req, res) => {
    const results = await VisitMedicalActivitiesRepository.getMedicalActivities();

    if (results instanceof Error) {
        return res.status(500).json({ results });
    } else return res.status(200).json(results);
};


