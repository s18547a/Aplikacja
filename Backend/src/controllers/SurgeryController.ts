import { getSurgeryPrameters } from "../common/Types";




class SurgeryController{
    surgeryRepository;

    constructor(surgeryRepository){
        this.surgeryRepository=surgeryRepository;
    }
    getSurgery=async(req,res)=>{

        const SurgeryId:string=req.params.SurgeryId;
        const results= await this.surgeryRepository.getSurgery(SurgeryId);
      
        if (results instanceof Error) {
            return res.status(500).json({});
        }
        if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    
    };
    
    getSurgeries= async (req, res)=>{
        const parameters: getSurgeryPrameters = { 
            OwnerId:req.query.OwnerId as any ,
            VetId:req.query.VetId as any,
            Date:req.query.Date as any
        };
        const results = await this.surgeryRepository.getSurgeries(parameters);
    
        if (results instanceof Error) {
            return res.status(500).json({});
        }
        if (results == null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    };
    
    getSurgeryTypes=async(req, res)=>{
        const results = await this.surgeryRepository.getSurgeryTypes();
        if (results instanceof Error) {
            return res.status(500).json({});
        } else return res.status(200).json(results);
    };

    searchSurgeries=async(req,res)=>{
        const parameters={
            Email:req.query.Email,
            Name:req.query.Name,
            Date:req.query.Date,
            OwnerId:req.query.OwnerId,
          
        };
        
        const results= await this.surgeryRepository.searchSurgeries(parameters);
    
        if (results instanceof Error) {
            return res.status(500).json({});
        } else if (!results || null) {
            return res.status(404).json({});
        } else return res.status(200).json(results);
    
    };
    
    registerSurgery=async(req,res)=>{
        const surgery=req.body;
    
        const results = await this.surgeryRepository.registerSurgery(surgery);
    
        if(results instanceof Error){
            return res.status(500).json(results);
        }
        else return res.status(201).json({newId:results});
    
    };
    
    updateSurgeryReport=async(req,res)=>{
        const surgeryReport=req.body;
    
        const results = await this.surgeryRepository.updateSurgeryReport(surgeryReport);
        if(results instanceof Error){
            return res.status(500).json(results);
        }
        else return res.status(201).json({});
    };
    
    deleteSurgery=async(req,res)=>{
        const SurgeryId=req.params.SurgeryId;
    
        const results =await this.surgeryRepository.deleteSurgery(SurgeryId);
        if(results instanceof Error){
            return res.status(500).json(results);
        }
        else return res.status(201).json({deletedId:results});
    
    };
    
}

export default SurgeryController;
