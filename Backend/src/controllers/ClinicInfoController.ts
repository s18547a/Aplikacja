import ClinicInfoRepository from '../services/repositories/ClinicInfoRepository';



class ClinicInfoController{

    clinicInfoRepository:ClinicInfoRepository;
    constructor(clinicInfoRepository:ClinicInfoRepository){
        this.clinicInfoRepository=clinicInfoRepository;
    }
    
    getClinicSchedulde=async(req,res)=>{
        const results = await this.clinicInfoRepository.getClinicSchedulde();
        if (results instanceof Error) {
            return res.status(500).json({});
        } else {
            return res.status(200).json(results);
        }
    };
}
export default  ClinicInfoController;


