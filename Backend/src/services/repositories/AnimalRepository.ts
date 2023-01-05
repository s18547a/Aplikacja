
import { AnimalParametersType } from '../../common/Types';
import Animal,{Sex} from '../../models/classes/Animal';
import AnimalType from '../../models/classes/AnimalType';
import Owner from '../../models/classes/Owner';
import { createIDwithUUIDV4 } from '../../utils/idHelpers';
import AnimalTypeRepository from './AnimalTypeRepository';
import OwnerRepository from './OwnerRepository';
import Repository from './Repository';

const sql = require('mssql');

class AnimalRepostiory extends Repository{
    

    animalTypeRepository
    ownerRepository;

    constructor(databse,animalTypeRepository:AnimalTypeRepository,ownerRepository:OwnerRepository){
        super(databse);
        this.animalTypeRepository=animalTypeRepository;
        this.ownerRepository=ownerRepository;
        //
    }
    getAnimal=async(AnimalId:string)=>{

        try {
    
            const pool =await sql.connect(this.databaseConfiguration);
            const result = await pool.request().input('AnimalId',sql.VarChar,AnimalId).query('Select AnimalId,Name,BirthDate,AnimalTypeId,OwnerId,ProfileImage,Sex From Animal where AnimalId=@AnimalId');
    
    
            const animalRecord=result.recordset[0];
    
            if(animalRecord==undefined){
    
                return null;
            }
    
      
            const AnimalType = await  this.animalTypeRepository.getAnimalTypes({
                AnimalTypeId: animalRecord.AnimalTypeId,
            });
            
           const ownerResult = await this.ownerRepository.getOwner(animalRecord.OwnerId);
            
            
        
            const newAnimal = new Animal(
                AnimalId,
                animalRecord.Name,
                animalRecord.BirthDate.toISOString().split('T')[0],
                animalRecord.OwnerId,
                animalRecord.ProfileImage,
                animalRecord.Sex,
                animalRecord.AnimalTypeId,
                AnimalType,
                {Email:ownerResult.Email}
            );
    
            return newAnimal;
    
        
        } catch (error) {
            console.log(error);
            return error;
        
        }
    };
    
    
    
    getAnimals=async(parameters: AnimalParametersType,animalTypeRepository)=>{
        try {
        
        
            const pool = await sql.connect(this.databaseConfiguration);
            let animalsRecordset;
    
            if ( !parameters.OwnerId && !parameters.Email) {
                const result = await pool.request().query('Select * From Animal');
                animalsRecordset = result.recordset;
            } else if (parameters.OwnerId) {
                const result = await pool
                    .request()
                    .input('OwnerId', sql.VarChar, parameters.OwnerId)
                    .query('Select * From Animal Where OwnerId=@OwnerId');
                animalsRecordset = result.recordset;
            } else  if (parameters.Email) {
                const result= await pool
                    .request()
                    .query(
                        `Select AnimalId,Name,BirthDate,u.OwnerId,Sex,AnimalTypeId From Animal a join [User] u on a.OwnerId=u.OwnerId   where u.Email like '${parameters.Email}%'`
                    );
                animalsRecordset = result.recordset;
            }
    
            let isEmpty: boolean;
            animalsRecordset[0] == undefined || animalsRecordset[0] === null
                ? (isEmpty = true)
                : (isEmpty = false);
    
            if (isEmpty) {
                return null;
            } else {
                const animals: Animal[] = await Promise.all(
                    animalsRecordset.map(async (animal) => {
                        const AnimalType = await  animalTypeRepository.getAnimalTypes({
                            AnimalTypeId: animal.AnimalTypeId,
                        });

                        const ownerResult = await this.ownerRepository.getOwner(animal.OwnerId);
                
                        const newAnimal = new Animal(
                            animal.AnimalId,
                            animal.Name,
                            animal.BirthDate.toISOString().split('T')[0],
                        
    
                            animal.OwnerId,
                            animal.ProfileImage,
                            animal.Sex,
                            animal.AnimalTypeId,
    
                            AnimalType,
                            {Email:ownerResult.Email}
                        );
    
                        return newAnimal;
                    })
                );
    
                return animals;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    registerAnimal =async(newAnimal)=>{
      
    
        try {
            const pool = await sql.connect(this.databaseConfiguration);
            let rowsAffected;
            const transaction = new sql.Transaction(pool);
    
            try {
                const AnimalId: string = createIDwithUUIDV4();
                const Name: string = newAnimal.Name;
                const BirthDate: string = newAnimal.BirthDate;
               
                const AnimalTypeId: string = newAnimal.AnimalTypeId;
                const OwnerId: string |null= newAnimal.OwnerId;
                const Sex: Sex = newAnimal.Sex;
    
                const ProfileImage: string = newAnimal.ProfileImage;
    
                console.log(AnimalId);
       
                await transaction.begin();
                const results = await new sql.Request(transaction)
                    .input('AnimalId', sql.VarChar, AnimalId)
                    .input('Name', sql.VarChar, Name)
                    .input('BirthDate', sql.Date, BirthDate)
                    
                    .input('AnimalTypeId', sql.VarChar, AnimalTypeId)
                    .input('OwnerId', sql.VarChar, OwnerId)
                    .input('Sex', sql.TinyInt, Sex)
    
                    .input('ProfileImage', sql.VarChar, ProfileImage)
                    .query(
                        'Insert into Animal(AnimalId,Name,BirthDate,AnimalTypeId,OwnerId,ProfileImage,Sex) values(@AnimalId,@Name,@BirthDate,@AnimalTypeId,@OwnerId,@ProfileImage,@Sex)'
                    );
                rowsAffected = results.rowsAffected[0];
              
    
                if (rowsAffected != 1) {
                  
                    throw Error('');
                } else {
                    const createAnimalMedicalInformationResult = await new sql.Request(transaction)
                        .input('AnimalId', sql.VarChar, AnimalId)
                        .query(
                            'Insert into AnimalMedicalInfo(AnimalId,Chipped,Sterilized,Skeletal,Muscular,Nervous,Endocrine,Cardiovascular,Lymphatic,Respiratory,Digestive,Urinary,Reproductive,Optical,Dental,Dermatological ,Others,Weight) values(@AnimalId,null,null,\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',null)'
                        );
                    if (createAnimalMedicalInformationResult.rowsAffected[0]!=1) {
                        console.log(rowsAffected[0]);
                        throw Error('');
                    } else {
                        
                        await transaction.commit();
                        
                        return AnimalId;
                    }
                }
            } catch (error) {
                await transaction.rollback();
                console.log(error);    
                throw Error('');
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    
    updateAnimal=async(Animal)=>{
        const AnimalId: string | null = Animal.AnimalId;
        const Name: string = Animal.Name;
        const BirthDate: string = Animal.BirthDate;
    
        const AnimalTypeId: string = Animal.AnimalTypeId;
        const OwnerId: string = Animal.OwnerId;
        const Sex: number = Animal.Sex;
    
        const ProfileImage: string | null = Animal.ProfileImage;
    
        try {
           
            const pool = await sql.connect(this.databaseConfiguration);
            const animalRegisterPool = await pool
                .request()
                .input('Name', sql.VarChar, Name)
                .input('BirthDate', sql.Date, BirthDate)
              
                .input('AnimalTypeId', sql.VarChar, AnimalTypeId)
                .input('OwnerId', sql.VarChar, OwnerId)
                .input('Sex', sql.TinyInt, Sex)
    
                .input('AnimalId', sql.VarChar, AnimalId)
                .input('ProfileImage', sql.VarChar, ProfileImage)
    
                .query(
                    'Update Animal set Name=@Name, BirthDate = @BirthDate,Sex=@Sex, ProfileImage=@ProfileImage where AnimalId=@AnimalId'
                );
            console.log(animalRegisterPool);
       
            return AnimalId;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    
}
export default AnimalRepostiory;
