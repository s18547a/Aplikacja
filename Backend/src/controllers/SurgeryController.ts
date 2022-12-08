import { getSurgeryPrameters } from '../models/classes/Interfaces';

const SurgeryRepository = require('../models/repositories/SurgeryRepository');
import express from 'express';
const router = express.Router();

class SurgeryController{
    async getSurgery(req,res){

        const SurgeryId:string=req.params.SurgeryId;
        const results= await SurgeryRepository.getSurgery(SurgeryId);
      
        if (results instanceof Error) {
            return res.status(500).json({});
        }
        if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    
    }
    
    async getSurgeries (req, res) {
        const parameters: getSurgeryPrameters = { 
            OwnerId:req.query.OwnerId as any ,
            VetId:req.query.VetId as any,
            Date:req.query.Date as any
        };
        const results = await SurgeryRepository.getSurgeries(parameters);
    
        if (results instanceof Error) {
            return res.status(500).json({});
        }
        if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    }
    
    async getSurgeryTypes (req, res) {
        const results = await SurgeryRepository.getSurgeryTypes();
        if (results instanceof Error) {
            return res.status(500).json({});
        } else return res.status(200).json(results);
    }
    
    async registerSurgery(req,res){
        const surgery=req.body;
    
        const results = await SurgeryRepository.registerSurgery(surgery);
    
        if(results instanceof Error){
            return res.status(500).json(results);
        }
        else return res.status(201).json({newId:results});
    
    }
    
    async updateSurgeryReport(req,res){
        const surgeryReport=req.body;
    
        const results = await SurgeryRepository.updateSurgeryReport(surgeryReport);
        if(results instanceof Error){
            return res.status(500).json(results);
        }
        else return res.status(201).json({});
    }
    
    async deleteSurgery(req,res){
        const SurgeryId=req.params.SurgeryId;
    
        const results =await SurgeryRepository.deleteSurgery(SurgeryId);
        if(results instanceof Error){
            return res.status(500).json(results);
        }
        else return res.status(201).json({deletedId:results});
    
    }
    
}

export default SurgeryController;
/*
export const getSurgery=async(req,res)=>{

    const SurgeryId:string=req.params.SurgeryId;
    const results= await SurgeryRepository.getSurgery(SurgeryId);
  
    if (results instanceof Error) {
        return res.status(500).json({});
    }
    if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);

};

export const getSurgeries= async (req, res) => {
    const parameters: getSurgeryPrameters = { 
        OwnerId:req.query.OwnerId as any ,
        VetId:req.query.VetId as any,
        Date:req.query.Date as any
    };
    const results = await SurgeryRepository.getSurgeries(parameters);

    if (results instanceof Error) {
        return res.status(500).json({});
    }
    if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};

export const getSurgeryTypes=async (req, res) => {
    const results = await SurgeryRepository.getSurgeryTypes();
    if (results instanceof Error) {
        return res.status(500).json({});
    } else return res.status(200).json(results);
};

export const registerSurgery=async(req,res)=>{
    const surgery=req.body;

    const results = await SurgeryRepository.registerSurgery(surgery);

    if(results instanceof Error){
        return res.status(500).json(results);
    }
    else return res.status(201).json({newId:results});

};

export const updateSurgeryReport=async(req,res)=>{
    const surgeryReport=req.body;

    const results = await SurgeryRepository.updateSurgeryReport(surgeryReport);
    if(results instanceof Error){
        return res.status(500).json(results);
    }
    else return res.status(201).json({});
};

export const deleteSurgery=async(req,res)=>{
    const SurgeryId=req.params.SurgeryId;

    const results =await SurgeryRepository.deleteSurgery(SurgeryId);
    if(results instanceof Error){
        return res.status(500).json(results);
    }
    else return res.status(201).json({deletedId:results});

};

*/
