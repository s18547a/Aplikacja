var app = require("../src/app.ts");

var supertest = require('supertest')

describe("POST",()=>{


    it("User have proper creditiental",async()=>{
        const userCreditientals={
            "Email":"jsmith@gmail.com",
            "Password":"pass"
        }

        const response = 
        await supertest(app).post("/users").send(userCreditientals);

        expect(response.status).toBe(200)
        

    })

    it("User does not exists in database",async()=>{
        const userCreditientals={
            "Email":"jsmit",
            "Password":"pas"
        }

        const response = 
        await supertest(app).post("/users").send(userCreditientals);

        expect(response.status).toBe(404)
    })

    it("Wrong password",async()=>{
        const userCreditientals={
            "Email":"jsmith@gmail.com",
            "Password":"pas"
        }

        const response = 
        await supertest(app).post("/users").send(userCreditientals);

        expect(response.status).toBe(401)
    })
})