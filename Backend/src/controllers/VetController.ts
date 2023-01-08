
import e from 'express';
import { GetScheduldeParamters, GetVetParameters } from '../common/Types';
import Schedulde from '../models/classes/Schedulde';
import VetRepository from '../services/repositories/VetRepository';
import VetScheduldeRepository from '../services/repositories/VetScheduldeRepository';
import VetTypeRepository from '../services/repositories/VetTypeRepository';

//const VetRepository = require('../models/repositories/VetRepository');
//const VetScheduldeRepository=require('../models/repositories/VetScheduldeRepository');
//const VetTypeRepository=require('../models/repositories/vetTypeRepository');

class VetController{


    vetRepository:VetRepository;
    vetTypeRepository:VetTypeRepository;
    vetScheduldeRepository:VetScheduldeRepository;

    constructor( vetRepository:VetRepository,vetTypeRepository:VetTypeRepository,vetScheduldeRepository:VetScheduldeRepository){
        this.vetRepository=vetRepository;
        this.vetTypeRepository=vetTypeRepository;
        this.vetScheduldeRepository=vetScheduldeRepository;
    }
    
    getVet=async(req, res)=>{
  
        const VetId=req.params.VetId;
        const results = await this.vetRepository.getVet(VetId);

        if (results instanceof Error) {
            return res.status(500).json({});
        } else if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };


    getVets=async(req, res)=>{
        const parameters: GetVetParameters = {
            Date: req.query.Date,
  
            VetType: req.query.VetType
        };
        const results = await this.vetRepository.getVets(parameters);

        if (results instanceof Error) {
            return res.status(500).json({});
        } else if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };

    getVetTypes=async(req, res)=>{
        const parameters = {
            VetId: req.query.VetId,
        };
        const results = await this.vetTypeRepository.getVetTypes(parameters);

        if (results instanceof Error) {
            return res.status(500).json({});
        } else return res.status(200).json(results);
    };

    registerVet=async(req, res)=>{
        const newVet = req.body;

        const results = await this.vetRepository.registerVet(newVet);
        if (results instanceof Error) {
            return res.status(500).json({});
        } else if (results == null) {
            return res.status(404).json({});
        } else return res.status(201).json({});
    };

    updateVet=async(req,res)=>{
        const updateVet=req.body;
        const results =this.vetRepository.updateVet(updateVet);
        if (results instanceof Error) {
            return res.status(500).json({});
        } else if (results == null) {
            return res.status(404).json({});
        } else return res.status(201).json({VetId:results});

    };




    getAvailableHours=async(req, res)=>{
        const isSurgery=req.query.isSurgery=='false'?false:true;
        const parameters: GetScheduldeParamters = {
            Date: req.query.Date as any,
            VetId: req.query.VetId as any,
            isSurgery:isSurgery
    
        };
        const results = await this.vetScheduldeRepository.getAvailableHours(parameters);

        if (results instanceof Error) {
            return res.status(500).json({});
        }
        else
        if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };

    getVetSchedulde=async(req, res)=>{
        const VetId: string = req.params.VetId;
        //req.query.VetId as any;
        const results = await this.vetScheduldeRepository.getSchedulde(VetId);

        if (results instanceof Error) {
            return res.status(500).json({});
        }
        else

        if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };

    getVetDaysOfWeek=async(req,res)=>{
        const VetId: string = req.params.VetId as any;
        const results = await this.vetScheduldeRepository.getVetDaysOfWeek(VetId);

        if (results instanceof Error) {
            return res.status(500).json({});
        }

        if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };

    updateSchedulde=async(req, res)=>{
        const updatedSchedulde: Schedulde = req.body;
        const results = await this.vetScheduldeRepository.updateSchedulde(updatedSchedulde);
        if (results instanceof Error) {
            return res.status(500).json({});
        } else return res.status(201).json({});
    };

    getFullSchedulde=async(req,res)=>{
        const results =await this.vetScheduldeRepository.getFullSchedulde();
        if (results instanceof Error){
            return res.status(500).json({})
        }
        else return res.status(200).json(results);
    }
   

}

export default VetController;
