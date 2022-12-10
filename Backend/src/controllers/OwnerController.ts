import { GetOwnerParamters } from '../models/classes/Interfaces';
import OwnerRepository from '../models/repositories/OwnerRepository';


//const OwnerRepository = require('../models/repositories/OwnerRepository');

class OwnerController{
    
    ownerRepository:OwnerRepository;
    constructor(ownerRepository:OwnerRepository){
        this.ownerRepository=ownerRepository;
    }
    getOwner= async(req,res)=>{

        const OwnerId=req.params.OwnerId;

        const results = await this.ownerRepository.getOwner(OwnerId);

        if (results instanceof Error) {
            return res.status(500).json({});
        }
        if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };



    getOwners =async(req, res)=>{
        const parameters: GetOwnerParamters = {
  
            AnimalId: req.query.AnimalId as any,
        };
        const results = await this.ownerRepository.getOwners(parameters);

        if (results instanceof Error) {
            return res.status(500).json({});
        }
        if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };

    registerOwner=async(req, res)=>{
        const newOwner = req.body;

        await this.ownerRepository.registerOwner(newOwner).then((data) => {
            if (data instanceof Error) {
                return res.status(500).json({});
            }
            if (data === null) {
                return res.status(404).json({});
            } else return res.status(201).json({});
        });
    };



}

export default OwnerController;

/*
export const getOwner=async(req,res)=>{

    const OwnerId=req.params.OwnerId;

    const results = await OwnerRepository.getOwner(OwnerId);

    if (results instanceof Error) {
        return res.status(500).json({});
    }
    if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};



export const getOwners= async (req, res) => {
    const parameters: GetOwnerParamters = {
  
        AnimalId: req.query.AnimalId as any,
    };
    const results = await OwnerRepository.getOwners(parameters);

    if (results instanceof Error) {
        return res.status(500).json({});
    }
    if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};

export const registerOwner=async (req, res) => {
    const newOwner = req.body;

    await OwnerRepository.registerOwner(newOwner).then((data) => {
        if (data instanceof Error) {
            return res.status(500).json({});
        }
        if (data === null) {
            return res.status(404).json({});
        } else return res.status(201).json({});
    });
};

*/