import AnimalController from './controllers/AnimalController';
import ClinicInfoController from './controllers/ClinicInfoController';
import OwnerController from './controllers/OwnerController';
import ReservationController from './controllers/ReservationContoller';
import SurgeryController from './controllers/SurgeryController';
import UserController from './controllers/UserController';
import VaccineController from './controllers/VaccineController';
import VetController from './controllers/VetController';
import VisitController from './controllers/VisitController';
import AnimalIllnessRepository from './models/repositories/AnimalIllnessRepository';
import AnimalMedicalInfoRepository from './models/repositories/AnimalMedicalInfoRepository';
import AnimalRepostiory from './models/repositories/AnimalRepository';
import AnimalTypeRepository from './models/repositories/AnimalTypeRepository';
import ClinicInfoRepository from './models/repositories/ClinicInfoRepository';
import MedicalActivityRepository from './models/repositories/MedicalActivityRepository';
import OwnerRepository from './models/repositories/OwnerRepository';
import ReservationRepository from './models/repositories/ReservationRepository';
import SurgeryRepository from './models/repositories/SurgeryRepository';
import UserRepository from './models/repositories/UserRepository';
import VaccineRepository from './models/repositories/VaccineRepository';
import VetRepository from './models/repositories/VetRepository';
import VetScheduldeRepository from './models/repositories/VetScheduldeRepository';
import VetTypeRepository from './models/repositories/VetTypeRepository';
import VisitRepository from './models/repositories/VisitRepository';
import AnimalRouter from './routers/AnimalRouter';
import ClinicInfoRouter from './routers/ClinicInfoRouter';
import OwnerRouter from './routers/OwnerRouter';
import ReservationRouter from './routers/ReservationRouter';
import SurgeryRouter from './routers/SurgeryRouter';
import UserRouter from './routers/UserRouter';
import VaccineRouter from './routers/VaccineRouter';
import VetRouter from './routers/VetRouter';
import VisitRouter from './routers/VisitRouter';

//const {createError} =require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
    

const app = express();

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
    const animalTypeRepository=new AnimalTypeRepository(db);
    const animalRepository=new AnimalRepostiory(db,animalTypeRepository);
    const animalMedicalInfoRepository=new AnimalMedicalInfoRepository(db);
    const animalIllnessRepository=new AnimalIllnessRepository(db);
    const clinicInfoRepository=new ClinicInfoRepository(db);
    const ownerRepository=new OwnerRepository(db);
    const vetTypeRepository=new VetTypeRepository(db);
    const vetScheduldeRepository=new VetScheduldeRepository(db);
    const vetRepository=new VetRepository(db,vetTypeRepository,vetScheduldeRepository);
    const reservationRepository=new ReservationRepository(db,ownerRepository,vetRepository);
    const medicalActivityRepository=new MedicalActivityRepository(db);
    const visitRepository=new VisitRepository(db,animalRepository,vetRepository,medicalActivityRepository,reservationRepository);
    const userRepository= new UserRepository(db);
    const surgeryRepository=new SurgeryRepository(db,animalRepository,vetRepository);
    const vaccineRepository=new VaccineRepository(db);
    //controllers
    const animalController=new AnimalController(animalRepository,animalTypeRepository,animalMedicalInfoRepository,animalIllnessRepository);
    const clinicInfoController=new ClinicInfoController(clinicInfoRepository);
    const ownerController=new OwnerController(ownerRepository);
    const reservationController=new ReservationController(reservationRepository);
    const vetController=new VetController(vetRepository,vetTypeRepository,vetScheduldeRepository);
    const visitController=new VisitController(visitRepository,medicalActivityRepository);
    const userController=new UserController(userRepository);
    const surgeryController=new SurgeryController(surgeryRepository);
    const vaccineController=new VaccineController(vaccineRepository);
    //routers
    const animalRouter=new AnimalRouter(animalController);
    const clinicInfoRouter=new ClinicInfoRouter(clinicInfoController);
    const ownerRouter=new OwnerRouter(ownerController);
    const reservationRouter=new ReservationRouter(reservationController);
    const vetRouter=new VetRouter(vetController);
    const visitRouter=new VisitRouter(visitController);
    const userRouter=new UserRouter(userController);
    const surgeryRouter=new SurgeryRouter(surgeryController);
    const vaccineRouter=new VaccineRouter(vaccineController);
    app.use('/users', userRouter.router);

    app.use('/owners', ownerRouter.router);

    app.use('/animals', animalRouter.router);

    app.use('/reservations', reservationRouter.router);

    app.use('/visits', visitRouter.router);

    app.use('/vets', vetRouter.router);

    app.use('/surgeries', surgeryRouter.router);

    app.use('/vaccines', vaccineRouter.router);

    app.use('/clinicInfo', clinicInfoRouter.router);
  
    app.use(function(req, res, next) {
        //  next(createError(404));
        return res.status(404).json({message:'Page not found'});
    });
    return app;
}

