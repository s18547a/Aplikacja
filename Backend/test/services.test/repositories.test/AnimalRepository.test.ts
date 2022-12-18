import Animal from '../../../src/models/classes/Animal';
import AnimalType from '../../../src/models/classes/AnimalType';
import AnimalRepostiory from '../../../src/services/repositories/AnimalRepository';
import AnimalTypeRepository from '../../../src/services/repositories/AnimalTypeRepository';


const testConfig=require('../../../src/config/mssql/testConnection');



describe('Testing animal Repository',()=>{

    const animalTypeRepository =new AnimalTypeRepository(test);
    const AnimalRepository= new AnimalRepostiory(testConfig,animalTypeRepository);

    const animalType:AnimalType=new AnimalType('PZ','Pies','Kundel');
  

    const animal :Animal={
        AnimalId:'0b52c3e3-1ffb-4b1d-80c4-404ffcf2dadf',
        OwnerId:'172d126f-7173-42c8-910b-8e4a3fb96780',
        AnimalTypeId:'PZ',
        Name:'NewAnimal',
        BirthDate:'2020-02-01',
        Sex:1,
        ProfileImage:null,
        AnimalType:animalType};
    

   

    it('Get animal by id',async()=>{
        const animalId=animal.AnimalId;

        const results = await AnimalRepository.getAnimal(animalId);

        expect(results).toBeInstanceOf(Animal);



       
    });

    it('Animal not found',async()=>{
       

        const results = await AnimalRepository.getAnimal('easaeae');

        expect(results).toBe(null);
        


       
    });

    it('Get animal list',async()=>{
        

        const results = await AnimalRepository.getAnimals({Email:'',OwnerId:''},animalTypeRepository);

        
        expect(results).toHaveLength(2);


    
    });

    it('Register animal',async()=>{

        const newAnimal={
            OwnerId:'172d126f-7173-42c8-910b-8e4a3fb96780',
            AnimalTypeId:'PZ',
            Name:'NewAnimal',
            BirthDate:'2020-02-01',
            Sex:1,
            ProfileImage:null,

        };

        const results =await AnimalRepository.registerAnimal(newAnimal);

        
        expect(results).toHaveLength(36);

    });

    it('Update animal',async()=>{

        const updatedAnimal={
            AnimalId:'0b52c3e3-1ffb-4b1d-80c4-404ffcf2dadf',
            OwnerId:'172d126f-7173-42c8-910b-8e4a3fb96780',
            AnimalTypeId:'PZ',
            Name:'NewAnimal',
            BirthDate:'2020-02-01',
            Sex:1,
            ProfileImage:null,

        };
        const results =await AnimalRepository.updateAnimal(updatedAnimal);
        expect(results).toHaveLength(36);

    });


});