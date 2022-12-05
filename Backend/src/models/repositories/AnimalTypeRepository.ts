import AnimalType from '../classes/AnimalType';
const config = require('../../config/mssql/userConnection.js');
const sql = require('mssql');

exports.getAnimalTypes = async (parameters: {
    AnimalTypeId: string | undefined;
  }) => {
    try {
        let animalTypeRecordSet;
        const pool = await sql.connect(config);
        let returnList = true;
        if (!parameters.AnimalTypeId) {
            const animalTypePool = await pool
                .request()
                .query('Select * From AnimalType');
            animalTypeRecordSet = animalTypePool.recordset;
        } else if (parameters.AnimalTypeId) {
            const animalTypePool = await pool
                .request()
                .input('AnimalTypeId', sql.VarChar, parameters.AnimalTypeId)
                .query('Select * From AnimalType where AnimalTypeId=@AnimalTypeId');
            animalTypeRecordSet = animalTypePool.recordset;
            returnList = false;
        }
  
        const animalTypes: AnimalType[] = animalTypeRecordSet.map((animalType) => {
            return new AnimalType(
                animalType.AnimalTypeId,
                animalType.Family,
                animalType.Race
            );
        });
        if (returnList == false) {
            return animalTypes[0];
        } else return animalTypes;
    } catch (error) {
        console.log(error);
        return error;
    }
};