import AnimalController from './controllers/AnimalController';
import AnimalIllnessRepository from './models/repositories/AnimalIllnessRepository';
import AnimalMedicalInfoRepository from './models/repositories/AnimalMedicalInfoRepository';
import AnimalRepostiory from './models/repositories/AnimalRepository';
import AnimalTypeRepository from './models/repositories/AnimalTypeRepository';
import AnimalRouter from './routers/AnimalRouter';

//const {createError} =require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
    
const userRouter = require('./routers/UserRouter');
    
const ownerRouter = require('./routers/OwnerRouter');
    


    
const reservationRouter = require('./routers/ReservationRouter');
    
const visitRouter = require('./routers/VisitRouter');
    
const vetRouter = require('./routers/VetRouter');
    
const surgeryRouter = require('./routers/SurgeryRouter');
    
const vaccineRouter =require('./routers/VaccineRouter');
    
const clinicInfoRouter=require('./routers/ClinicInfoRouter');    const app = express();

// eslint-disable-next-line require-jsdoc
export default function(db) {

   
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cors());

    app.get('/', async (req, res) => {
        res.status(200).json({message: 'REST API for Vet Clinic App'});
    });

    //repositories   
    const animalTypeRepository=new AnimalTypeRepository();
    const animalRepository=new AnimalRepostiory(animalTypeRepository);
    const animalMedicalInfoRepository=new AnimalMedicalInfoRepository();
    const animalIllnessRepository=new AnimalIllnessRepository();
    
   

    //controllers
    const animalController=new AnimalController(animalRepository,animalTypeRepository,animalMedicalInfoRepository,animalIllnessRepository);




    //routers
    const animalRouter=new AnimalRouter(animalController);


    app.use('/users', userRouter);

    app.use('/owners', ownerRouter);

    app.use('/animals', animalRouter.router);

    app.use('/reservations', reservationRouter);

    app.use('/visits', visitRouter);

    app.use('/vets', vetRouter);

    app.use('/surgeries', surgeryRouter);

    app.use('/vaccines', vaccineRouter);

    app.use('/clinicInfo', clinicInfoRouter);
  
    app.use(function(req, res, next) {
        //  next(createError(404));
        return res.status(404).json({message:'Page not found'});
    });
    return app;
}

