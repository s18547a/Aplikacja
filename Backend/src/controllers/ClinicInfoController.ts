const ClinicInfoRepository = require('../repositories/ClinicInfoRepository');


export const getClinicSchedulde =async (req, res) => {
    const results = await ClinicInfoRepository.getClinicSchedulde();
    if (results instanceof Error) {
        return res.status(500).json({});
    } else {
        return res.status(200).json(results);
    }
};


