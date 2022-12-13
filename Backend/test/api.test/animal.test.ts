import makeApp from '../../src/app';
import Animal from '../../src/models/classes/Animal';
const testConfig=require('../../src/config/mssql/testConnection');
const supertest = require('supertest');
const app = makeApp(testConfig);


describe('Animal', ()=>{

    
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1hbmFnZXJAZ21haWwuY29tIiwiVXNlcklkIjoiNzQiLCJpYXQiOjE2NzA5NTUwOTEsImV4cCI6MTY3MDk5MTA5MX0.Qazvk5YpRG9y4GCPyuaV7AmOYPX0XcWwrXuUZHePG6k';
   
   

    it('Animal exists in database',async()=>{

        const animalId='0b52c3e3-1ffb-4b1d-80c4-404ffcf2dadf';

        const url='/animals/'+animalId;

        const response=await supertest(app).get(url);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();

    }); 

    it('Animal does not exists in database',async()=>{

        const animalId='0b52c3e3-1ffb-4b1d-8easa0c4-404ffcf2dadf';

        const url='/animals/'+animalId;

        const response=await supertest(app).get(url);

        expect(response.status).toBe(404);


    }); 

    it('Get animal list',async()=>{

       

        const url='/animals';

        const response=await supertest(app).get(url);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        

    }); 



    it('Register animal',async()=>{
        const url='/animals';
        const animal={
            OwnerId:'172d126f-7173-42c8-910b-8e4a3fb96780',
            AnimalTypeId:'PZ',
            Name:'NewAnimal',
            BirthDate:'2020-02-01',
            Sex:1,
            ProfileImage:null,

        };
        const response=await supertest(app).post(url).send(animal).set('Authorization', `Bearer ${token}`,);

        expect(response.status).toBe(201);
        expect(response.body.newId).toHaveLength(36);

    });

    it('Update animal',async()=>{
        const url='/animals';
        const animal={
            OwnerId:'172d126f-7173-42c8-910b-8e4a3fb96780',
            AnimalTypeId:'PZ',
            Name:'NewAnimal',
            BirthDate:'2020-02-01',
            Sex:1,
            ProfileImage:null,

        };
        const response=await supertest(app).post(url).send(animal).set('Authorization', `Bearer ${token}`,);

        expect(response.status).toBe(201);
        expect(response.body.newId).toHaveLength(36);

    });


});