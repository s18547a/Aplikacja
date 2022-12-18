import User from '../../../src/models/classes/User';
import UserRepository from '../../../src/services/repositories/UserRepository';


const testConfig=require('../../../src/config/mssql/testConnection');

const email='testManager@gmail.com';

describe('Testing  user Repository',()=>{

    const userRepository= new UserRepository(testConfig);


    it('Get User by Email',async()=>{

        const results= await userRepository.getUserByEmail(email);

        expect(results).toBeInstanceOf(User);
    });

    it('Email does not exists',async()=>{

        const results =await userRepository.getUserByEmail('Ea Ra');

        expect(results).toEqual(null);
    });


});