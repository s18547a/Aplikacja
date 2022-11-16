var app = require("../src/app.ts");
//import {describe,expect,test} from '@jest/globals';
//import supertest from "supertest"
//test
var supertest = require('supertest')


describe("GET /animals", () => {
   
      it("Return array of Animals", async () => {
        const response = await supertest(app).get("/animals");
  
        expect(response.status).toBe(200);
       
      });
   
  
    
      it("Return single object", async () => {
        const response = await supertest(app).get("/animals/fcf80735-caad-44ed-8393-aa2df1c85adf");
  
        expect(response.status).toBe(200);
      });
  
    
      it("Return 404", async () => {
        const response = await supertest(app).get("/animals/334535");
  
        expect(response.status).toBe(404);
      });
   
  });

  describe('/POST /animals',()=>{

    const newAnimalTest={
      "OwnerId":"1",
      "Name":"Jest",
      "BirthDate":"2000-01-01",
      "Weight":5,
      "AnimalTypeId":"1",
      "ProfileImage":null,
      "Sex":1

    }
    it("Proper animal",async ()=>{
      const response =await supertest(app).post('/animals').send(newAnimalTest)
      expect(response.status).toBe(201)

    
    })
  })

  
  