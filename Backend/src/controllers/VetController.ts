import { GetScheduldeParamters, GetVetParameters } from '../classes/Interfaces';


import Schedulde from '../classes/Schedulde';

const VetRepository = require('../repositories/vetRepositories/VetRepository');
const VetScheduldeRepository=require('../repositories/vetRepositories/VetScheduldeRepository');
const VetTypeRepository=require('../repositories/vetRepositories/vetTypeRepository');


export const getVet= async (req, res) => {
  
    const VetId=req.params.VetId;
    const results = await VetRepository.getVet(VetId);

    if (results instanceof Error) {
        return res.status(500).json({});
    } else if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};


export const getVets= async (req, res) => {
    const parameters: GetVetParameters = {
        Date: req.query.Date as any,
  
        VetType: req.query.VetType as any,
    };
    const results = await VetRepository.getVets(parameters);

    if (results instanceof Error) {
        return res.status(500).json({});
    } else if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};

export const getVetTypes=async (req, res) => {
    const parameters = {
        VetId: req.query.VetId,
    };
    const results = await VetTypeRepository.getVetTypes(parameters);

    if (results instanceof Error) {
        return res.status(500).json({});
    } else return res.status(200).json(results);
};

export const registerVet=  async (req, res) => {
    const newVet = req.body;

    const results = await VetRepository.registerVet(newVet);
    if (results instanceof Error) {
        return res.status(500).json({});
    } else if (results == null) {
        return res.status(404).json({});
    } else return res.status(201).json({});
};




export const getAvailableHours=async (req, res) => {
    const isSurgery=req.query.isSurgery=='false'?false:true;
    const parameters: GetScheduldeParamters = {
        Date: req.query.Date as any,
        VetId: req.query.VetId as any,
        isSurgery:isSurgery
    
    };
    const results = await VetScheduldeRepository.getAvailableHours(parameters);

    if (results instanceof Error) {
        return res.status(500).json({});
    }
    else
    if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};

export const getVetSchedulde=async (req, res) => {
    const VetId: string = req.params.VetId;
    //req.query.VetId as any;
    const results = await VetScheduldeRepository.getSchedulde(VetId);

    if (results instanceof Error) {
        return res.status(500).json({});
    }
    else

    if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};

export const getVetDaysOfWeek=async(req,res)=>
{
    const VetId: string = req.params.VetId as any;
    const results = await VetScheduldeRepository.getVetDaysOfWeek(VetId);

    if (results instanceof Error) {
        return res.status(500).json({});
    }

    if (results == null) {
        return res.status(404).json({});
    } else return res.status(200).json(results);
};

export const updateSchedulde=async (req, res) => {
    const updatedSchedulde: Schedulde = req.body;
    const results = await VetScheduldeRepository.updateSchedulde(updatedSchedulde);
    if (results instanceof Error) {
        return res.status(500).json({});
    } else return res.status(201).json({});
};

