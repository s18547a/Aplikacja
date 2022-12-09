import ClinicInfoRepository from '../models/repositories/ClinicInfoRepository';

//const ClinicInfoRepository = require('../models/repositories/ClinicInfoRepository');

class ClinicInfoController{

    clinicInfoRepository:ClinicInfoRepository;
    constructor(clinicInfoSchedule){
        this.clinicInfoRepository=clinicInfoSchedule;
    }
    
    async getClinicSchedulde(req,res){
        const results = await this.clinicInfoRepository.getClinicSchedulde();
        if (results instanceof Error) {
            return res.status(500).json({});
        } else {
            return res.status(200).json(results);
        }
    }
}
export default  ClinicInfoController;
/*
export const getClinicSchedulde =async (req, res) => {
  
};
*/

